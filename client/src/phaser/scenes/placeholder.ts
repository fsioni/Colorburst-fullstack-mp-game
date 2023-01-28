import Phaser from "phaser";

/**
 * FirstGameScene is an example Phaser Scene
 * @class
 * @constructor
 * @public
 */
export class FirstGameScene extends Phaser.Scene {
  private controls!: Phaser.Cameras.Controls.SmoothedKeyControl;

  constructor() {
    super("FirstGameScene");
    console.log("FirstGameScene.constructor()");
  }

  preload() {
    console.log("FirstGameScene.preload");
  }

  create() {
    const cursors = this.input.keyboard.createCursorKeys();

    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl({
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      acceleration: 0.06,
      drag: 0.0005,
      maxSpeed: 1.0,
    });

    const { width, height } = this.sys.canvas;
    this.add.grid(width / 2, height / 2, width, height, 64, 64, 0x00b9f2); //.setAltFillStyle(0x016fce)//.setOutlineStyle();

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

  update(time: number, deltaTime: number) {
    this.controls.update(deltaTime);
  }
}
