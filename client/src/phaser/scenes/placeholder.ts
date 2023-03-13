import Phaser from "phaser";
import Player from "../gameObjects/Player";
import Board from "../gameObjects/Board";
import io from "socket.io-client";
import { Buffer } from "buffer";

const Socketorigin =
  window.location.origin.split(":")[0] +
  ":" +
  window.location.origin.split(":")[1] +
  ":3040";

export class FirstGameScene extends Phaser.Scene {
  socket = io(Socketorigin);
  player: Player | null = null;
  players: Player[];
  board?: Board;

  constructor() {
    super("FirstGameScene");
    this.players = [];
  }

  preload() {
    this.load.spritesheet("playerHeads", "src/assets/img/player_heads.png", {
      frameWidth: 142,
      frameHeight: 183,
    });
    this.load.spritesheet("boardCells", "src/assets/img/cells.png", {
      frameWidth: 10,
      frameHeight: 10,
    });
  }

  create() {
    // On envoie un message au serveur pour dire que le joueur est pret
    this.socket.emit("playerReady");

    // On recoit les parametres de la partie
    this.socket.on("gameSettings", (data: { boardSize: number }) => {
      this.board = new Board(this, data.boardSize, data.boardSize, this.socket);
    });

    this.handleSocketEvents();

    this.cameras.main.setZoom(0.4);
  }

  // Met a jour la position des joueurs
  updatePlayerPos(
    data: { playerID: string; x: number; y: number; direction: number }[]
  ) {
    const packetSize = Buffer.byteLength(JSON.stringify(data));
    console.log(`[playersPositions] Packet size: ${packetSize} bytes`);
    if (this.player?.id) {
      const dataThisPlayer = data.find(
        (p: { playerID: string }) => p.playerID === this.player?.id
      );

      if (dataThisPlayer) {
        this.player.correctPosition(
          dataThisPlayer.x,
          dataThisPlayer.y,
          dataThisPlayer.direction
        );
      }
    }

    //remove players that are not in the data
    this.players.forEach((player: Player) => {
      const dataPlayer = data.find(
        (p: { playerID: string }) => p.playerID === player.id
      );

      if (!dataPlayer) {
        player.destroy();
        this.players = this.players.filter((p: Player) => p.id !== player.id);
        return;
      }

      //move players to new positions

      if (
        dataPlayer.x === player.boardPosition.x &&
        dataPlayer.y === player.boardPosition.y
      )
        return;

      player.correctPosition(dataPlayer.x, dataPlayer.y, dataPlayer.direction);
    });
  }

  // Met a jour la liste des joueurs
  updatePlayerList(data: { id: string; color: number }[]) {
    const packetSize = Buffer.byteLength(JSON.stringify(data));
    console.log(`[playersList] Packet size: ${packetSize} bytes`);

    data.forEach((p) => {
      if (!this.players.find((player: Player) => player.id === p.id)) {
        if (!this.board) return;

        if (p.id === this.socket?.id && this.player === null) {
          this.player = this.add.existing(
            new Player(this, p.id, this.board, p.color, true, this.socket)
          );
          this.player.setFrame(p.color);
          this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        } else {
          //check if it is the player
          if (this.player?.id === p.id) return;
          const newPlayer = new Player(this, p.id, this.board, p.color);
          newPlayer.setFrame(p.color);
          this.players.push(this.add.existing(newPlayer));
        }
      }
    });
  }

  // A chaque fois que le serveur nous envoie un tick, on met à jour les positions des joueurs
  tickGame() {
    this.player?.calculateBoardPosition();
    this.players.forEach((player) => {
      player.calculateBoardPosition();
    });
  }

  // Met a jour le leaderboard
  updateLeaderBoard(data: { id: string; score: number }[]) {
    const leaderBoard = document.getElementById("scoreBoardBody");
    if (!leaderBoard) return;
    leaderBoard.innerHTML = "";
    data.forEach((player, i) => {
      const row = document.createElement("tr");
      const place = document.createElement("td");
      const id = document.createElement("td");
      const score = document.createElement("td");
      place.innerText = (i + 1).toString();
      id.innerText = player.id;
      score.innerText = player.score.toString();
      row.appendChild(place);
      row.appendChild(id);
      row.appendChild(score);
      leaderBoard.appendChild(row);
    });
  }

  // Gere les evenements du socket
  handleSocketEvents() {
    // On utilsie le bind pour que this soit dans le contexte de la fonction
    this.socket?.on("playersList", this.updatePlayerList.bind(this));
    this.socket.on("playersPositions", this.updatePlayerPos.bind(this));
    this.socket?.on("gameUpdated", this.tickGame.bind(this));
    this.socket?.on("leaderBoard", this.updateLeaderBoard.bind(this));
  }
}
