import Phaser from "phaser";
import { Direction } from "../Direction";

const speed = 10;

export default class Player extends Phaser.GameObjects.Sprite {
  direction: Direction | null;
  isPlayable: boolean;

  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene, x: number, y: number, isPlayable: boolean) {
    super(scene, x, y, "playerHeads");

    this.direction = null;
    this.isPlayable = isPlayable;

    this.cursors = scene.input.keyboard.createCursorKeys();
    super.setPosition(x, y);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    this.handleInputs();
    this.handleMovements();
  }

  handleInputs() {
    if (this.cursors.up.isDown) {
      this.direction = Direction.Up;
      //Send to server socket
    } else if (this.cursors.down.isDown) {
      this.direction = Direction.Down;
      //Send to server socket
    } else if (this.cursors.right.isDown) {
      this.direction = Direction.Right;
      //Send to server socket
    } else if (this.cursors.left.isDown) {
      this.direction = Direction.Left;
      //Send to server socket
    }
  }

  handleMovements() {
    switch (this.direction) {
      case Direction.Up:
        this.y -= speed;
        break;
      case Direction.Down:
        this.y += speed;
        break;
      case Direction.Right:
        this.x += speed;
        break;
      case Direction.Left:
        this.x -= speed;
        break;
    }
  }
}
