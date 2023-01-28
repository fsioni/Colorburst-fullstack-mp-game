import Phaser from "phaser";

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
  }

  create() {
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
  }

  /*update() {

    }*/
}
