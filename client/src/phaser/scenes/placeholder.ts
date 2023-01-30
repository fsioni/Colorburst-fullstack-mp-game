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
  constructor() {
    super("FirstGameScene");
    console.log("FirstGameScene.constructor()");
  }

  preload() {
    console.log("FirstGameScene.preload");
    this.load.spritesheet("playerHeads", "src/assets/img/player_heads.png", {
      frameWidth: 142,
      frameHeight: 183,
    });
  }

  create() {
    new Board(this, 200, 200);

    const player = this.add.existing(new Player(this, 200, 200, true));
    this.cameras.main.startFollow(player, true, 0.1, 0.1);
    this.cameras.main.setZoom(0.4);
  }
}
