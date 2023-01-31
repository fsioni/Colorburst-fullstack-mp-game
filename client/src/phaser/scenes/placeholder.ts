import Phaser from "phaser";
import Player from "../gameObjects/Player";
import Board from "../gameObjects/Board";
import io from "socket.io-client";

export class FirstGameScene extends Phaser.Scene {
  socket = io("http://localhost:3000");
  player: Player | null = null;
  players: Player[];
  board?: Board;

  constructor() {
    super("FirstGameScene");
    console.log("FirstGameScene.constructor()");
    this.players = [];
  }

  preload() {
    console.log("FirstGameScene.preload");
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
    this.board = new Board(this, 20, 20, this.socket);
    this.handleSocketEvents(this.board);

    const player = this.add.existing(
      new Player(this, "0", this.board, true, this.socket)
    );
    this.cameras.main.startFollow(player, true, 0.1, 0.1);
    this.cameras.main.setZoom(0.4);
  }

  updatePlayersPositions(board: Board) {
    this.socket.on("playersPositions", (data: any) => {
      //console.log(data);

      //add players that are not in the players array
      Object.keys(data).forEach((id: string) => {
        if (!this.players.find((player: Player) => player.id === id)) {
          if (this.player && this.player.id === id) {
            return;
          }

          const newPlayer = new Player(this, id, board);
          this.cameras.main.startFollow(newPlayer, true, 0.1, 0.1);
          this.players.push(this.add.existing(newPlayer));
        }
      });

      //remove players that are not in the data
      this.players.forEach((player: Player) => {
        if (!data[player.id]) {
          player.destroy();
          this.players = this.players.filter((p: Player) => p.id !== player.id);
        }

        //move players to new positions
        const { x, y } = data[player.id];
        if (x === player.boardPosition.x && y === player.boardPosition.y) {
          return;
        }
        player.correctPosition(x, y);
      });

      if (this.player) {
        const { x, y } = data[this.player.id];
        this.player.correctPosition(x, y);
      }
    });
  }

  handleSocketEvents(board: Board) {
    this.updatePlayersPositions(board);
  }
}
