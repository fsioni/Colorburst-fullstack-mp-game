import { Socket } from "socket.io-client";
import Phaser from "phaser";
import { Direction } from "../Direction";
import Board from "./Board";
import Point = Phaser.Geom.Point;
export default class Player extends Phaser.GameObjects.Sprite {
  direction: Direction | null = null;
  isPlayable = false;
  id: string;
  isAlive = true;
  socket: Socket | null = null;

  lastMoveTime = 0;
  moveCooldownTime = 10000;

  lastMovementChangeTime = 0;
  movementChangeCooldownTime = 100;
  board: Board;

  boardPosition = { x: 0, y: 0 };
  aimedPosition = new Point(0, 0);
  aimedAngle = 0;
  interpolationRatio = 0.01;

  cursors = this.scene.input.keyboard.createCursorKeys();
  color = 0;

  constructor(
    scene: Phaser.Scene,
    id: string,
    board: Board,
    color = 0,
    isPlayable = false,
    _socket: Socket | null = null
  ) {
    super(scene, 0, 0, "playerHeads");

    this.board = board;

    this.color = color;

    this.isPlayable = isPlayable;
    if (this.isPlayable && _socket) {
      this.socket = _socket;
    }
    this.id = id;
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    if (this.isPlayable) {
      this.handleInputs();
    }
    this.handleMovements(delta);
    this.handleRotation(delta);
  }

  keyPressed() {
    if (!this.socket) {
      return;
    }

    this.socket.emit("directionChange", this.direction);
    this.lastMovementChangeTime = Date.now();
  }

  handleInputs() {
    if (
      Date.now() - this.lastMovementChangeTime <
      this.movementChangeCooldownTime
    ) {
      console.log("move cooldown not over");
      return;
    }

    if (
      this.cursors.up.isDown &&
      !(this.direction === Direction.Up) &&
      !(this.direction === Direction.Down)
    ) {
      this.changeDirection(Direction.Up);
      this.keyPressed();
    } else if (
      this.cursors.down.isDown &&
      !(this.direction === Direction.Down) &&
      !(this.direction === Direction.Up)
    ) {
      this.changeDirection(Direction.Down);

      this.keyPressed();
    } else if (
      this.cursors.right.isDown &&
      !(this.direction === Direction.Right) &&
      !(this.direction === Direction.Left)
    ) {
      this.changeDirection(Direction.Right);
      this.keyPressed();
    } else if (
      this.cursors.left.isDown &&
      !(this.direction === Direction.Left) &&
      !(this.direction === Direction.Right)
    ) {
      this.changeDirection(Direction.Left);
      this.keyPressed();
    }
  }

  handleMovements(delta: number) {
    const actualPosition = new Point(this.x, this.y);
    const nextPosition = new Point(0, 0);
    Phaser.Geom.Point.Interpolate(
      actualPosition,
      this.aimedPosition,
      this.interpolationRatio * delta,
      nextPosition
    );

    this.setPosition(nextPosition.x, nextPosition.y);
  }

  handleRotation(delta: number) {
    this.angle = Phaser.Math.Interpolation.Linear(
      [this.angle, this.aimedAngle],
      0.01 * delta
    );
  }

  changeDirection(direction: Direction) {
    this.direction = direction;
    if (this.direction === Direction.Up) {
      this.aimedAngle = 180;
    } else if (this.direction === Direction.Down) {
      this.aimedAngle = 0;
    } else if (this.direction === Direction.Left) {
      this.aimedAngle = 90;
    } else if (this.direction === Direction.Right) {
      this.aimedAngle = -90;
    }
  }

  correctPosition(x: number, y: number, direction: number) {
    this.boardPosition.x = x;
    this.boardPosition.y = y;
    this.changeDirection(direction);
    const cellPosition = this.board.aGrid.getCellPosition(x, y);
    this.aimedPosition.x = cellPosition.x;
    this.aimedPosition.y = cellPosition.y;
  }
}
