import Phaser, { Game } from "phaser";
import Player from "../gameObjects/Player";
import Board from "../gameObjects/Board";
import io from "socket.io-client";
import { getAuth } from "firebase/auth";
import app from "../../Firebase";
import { Buffer } from "buffer";
import { get } from "http";

const Socketorigin =
  window.location.origin.split(":")[0] +
  ":" +
  window.location.origin.split(":")[1] +
  ":3040";

export default class GameScene extends Phaser.Scene {
  socket: any;
  player: Player | null = null;
  players: Player[];
  board?: Board;
  constructor() {
    super("FirstGameScene");
    this.players = [];
    //get  value from localStorage selectedSkin as number
    const selectedSkin = Number(localStorage.getItem("selectedSkin")) || 0;
    const gameID = localStorage.getItem("gameId") || "default";
    const password = localStorage.getItem("gamePassword") || "default";
    console.log("PASSWORD : " + password);

    console.log("Player skin number " + selectedSkin);
    getAuth(app)
      .currentUser?.getIdToken()
      .then((_token) => {
        console.log(_token);
        this.socket = io(Socketorigin, {
          auth: {
            token: _token,
          },
          query: {
            playerSkin: selectedSkin,
            gameID: gameID,
            password: password,
          },
        });
      });
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

    this.cameras.main.setZoom(0.2);
    this.initVolumeControl();
    this.initGamePassword();
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
        player.removeText();
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
  updatePlayerList(data: { id: string; pseudo: string; color: number }[]) {
    const packetSize = Buffer.byteLength(JSON.stringify(data));
    console.log(`[playersList] Packet size: ${packetSize} bytes`);

    data.forEach((p) => {
      const playerFound = this.players.find(
        (player: Player) => player.id === p.id
      );

      if (!playerFound) {
        if (!this.board) return;

        if (p.id === this.socket?.id && this.player === null) {
          this.player = this.add.existing(
            new Player(this, p.id, this.board, p.color, true, this.socket)
          );
          if (p.pseudo) this.player.changePseudo(p.pseudo);
          this.player.setFrame(p.color);
          this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        } else {
          //check if it is the player
          if (this.player?.id === p.id) return;
          const newPlayer = new Player(this, p.id, this.board, p.color);
          if (p.pseudo) newPlayer.changePseudo(p.pseudo);
          newPlayer.setFrame(p.color);
          this.players.push(this.add.existing(newPlayer));
        }
      } else {
        playerFound.changePseudo(p.pseudo);
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
  updateLeaderBoard(data: { id: string; pseudo: string; score: number }[]) {
    const leaderBoard = document.getElementById("scoreBoardBody");
    if (!leaderBoard) return;
    leaderBoard.innerHTML = "";
    data.forEach((player, i) => {
      const row = document.createElement("tr");
      const place = document.createElement("td");
      const id = document.createElement("td");
      const score = document.createElement("td");
      place.innerText = (i + 1).toString();
      id.innerText = player.pseudo;
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
    this.game?.events.on("destroy", () => {
      this.socket?.disconnect();
    });
    this.socket?.on("playersList", this.updatePlayerList.bind(this));
    this.socket.on("playersPositions", this.updatePlayerPos.bind(this));
    this.socket?.on("gameUpdated", this.tickGame.bind(this));
    this.socket?.on("leaderBoard", this.updateLeaderBoard.bind(this));
    this.socket?.on("wrongPassword", () => {
      // On clear le local storage
      localStorage.removeItem("gamePassword");
      localStorage.removeItem("gameId");
      alert("Wrong password");
      //   Reload
      window.location.reload();
    });
  }

  initVolumeControl() {
    const soundBtn = document.getElementById("soundBtn");
    if (!soundBtn) return;

    soundBtn.onclick = () => {
      const state = this.toggleVolume();
      // On change l'image du bouton via le src
      soundBtn.setAttribute(
        "src",
        state ? "./ress/volume.png" : "./ress/mute.png"
      );
    };

    const state = this.setIsAudioMuted();
    soundBtn.setAttribute(
      "src",
      state ? "./ress/volume.png" : "./ress/mute.png"
    );
  }

  toggleVolume() {
    const isMuted = localStorage.getItem("isMuted") === "true";
    const newIsMuted = !isMuted;
    localStorage.setItem("isMuted", newIsMuted.toString());
    this.setIsAudioMuted(newIsMuted);
    return newIsMuted;
  }

  setIsAudioMuted(isMuted?: boolean) {
    if (isMuted === undefined)
      isMuted = localStorage.getItem("isMuted") === "true";
    localStorage.setItem("isMuted", isMuted.toString());
    const soundState = isMuted ? false : true;
    //wait for the player to be created
    if (!this.player)
      setTimeout(() => this.player?.setIsAudioMuted(soundState), 100);
    else this.player?.setIsAudioMuted(soundState);
    return isMuted;
  }

  initGamePassword() {
    const gamePass = localStorage.getItem("gamePassword");
    const gamePassword = document.getElementById("gamePassword");
    if (!gamePassword) return;
    gamePassword.textContent = !gamePass
      ? "No Password"
      : "Password : " + gamePass;
  }
}
