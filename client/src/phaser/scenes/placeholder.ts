import Cell from "../gameObjects/Cell";
import Phaser from "phaser";
import Player from "../gameObjects/Player";
import { AlignGrid } from "../utils/AlignGrid";
import Board from "../gameObjects/Board";
/**
 * FirstGameScene is an example Phaser Scene
 * @class
 * @constructor
 * @public
 */
export class FirstGameScene extends Phaser.Scene {
  board: Board;
  constructor() {
    super("FirstGameScene");
    console.log("FirstGameScene.constructor()");
    this.board = new Board(this, 20, 20);
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
    const player = this.add.existing(new Player(this, 200, 200, true));
    this.cameras.main.startFollow(player, true, 0.1, 0.1);
    this.cameras.main.setZoom(0.4);
  }
}
