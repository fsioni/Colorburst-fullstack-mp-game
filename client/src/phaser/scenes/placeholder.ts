import Phaser from "phaser";
import Player from "../gameObjects/Player";

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
    const { width, height } = this.sys.canvas;
    const gridW = width * 3;
    const gridH = height * 3;
    this.add
      .grid(0, 0, gridW, gridH, 142, 142, 0x00b9f2)
      .setAltFillStyle(0x016fce)
      .setOutlineStyle();

    const graphics = this.add.graphics({ fillStyle: { color: 0xff0000 } });

    const circle = new Phaser.Geom.Circle(400, 300, 200);

    graphics.fillCircleShape(circle);

    this.input.on("pointermove", function (pointer: { x: number; y: number }) {
      graphics.clear();

      if (circle.contains(pointer.x, pointer.y)) {
        graphics.fillStyle(0x00ff00);
      } else {
        graphics.fillStyle(0xff0000);
      }

      graphics.fillCircleShape(circle);
    });

    const player = this.add.existing(new Player(this, 200, 200, true));
    this.cameras.main.startFollow(player, true, 0.1, 0.1);
    this.cameras.main.setZoom(0.4);
  }
}
