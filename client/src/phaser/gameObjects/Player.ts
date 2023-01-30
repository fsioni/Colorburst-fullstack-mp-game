import { Socket } from "socket.io-client";
import Phaser from "phaser";
import { Direction } from "../Direction";
import Board from "./Board";

const speed = 10;
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

  cursors = this.scene.input.keyboard.createCursorKeys();

  constructor(
    scene: Phaser.Scene,
    id: string,
    board: Board,
    isPlayable = false,
    _socket: Socket | null = null
  ) {
    super(scene, 0, 0, "playerHeads");

    this.board = board;
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
    this.handleMovements();
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
      console.log("cooldown not over");
      return;
    }

    if (this.cursors.up.isDown && !(this.direction === Direction.Up)) {
      this.direction = Direction.Up;
      this.keyPressed();
    } else if (
      this.cursors.down.isDown &&
      !(this.direction === Direction.Down)
    ) {
      this.direction = Direction.Down;
      this.keyPressed();
    } else if (
      this.cursors.right.isDown &&
      !(this.direction === Direction.Right)
    ) {
      this.direction = Direction.Right;
      this.keyPressed();
    } else if (
      this.cursors.left.isDown &&
      !(this.direction === Direction.Left)
    ) {
      this.direction = Direction.Left;
      this.keyPressed();
    }
  }

  handleMovements() {
    if (Date.now() - this.lastMoveTime < this.moveCooldownTime) {
      return;
    }

    switch (this.direction) {
      case Direction.Up:
        this.boardPosition.y -= 1;
        this.board.aGrid.placeAt(
          this.boardPosition.x,
          this.boardPosition.y,
          this
        );
        this.moveCooldownTime = Date.now();
        //this.y -= speed;
        break;
      case Direction.Down:
        this.boardPosition.y += 1;
        this.board.aGrid.placeAt(
          this.boardPosition.x,
          this.boardPosition.y,
          this
        );
        this.moveCooldownTime = Date.now();

        // this.y += speed;
        break;
      case Direction.Right:
        this.boardPosition.x += 1;
        this.board.aGrid.placeAt(
          this.boardPosition.x,
          this.boardPosition.y,
          this
        );
        this.moveCooldownTime = Date.now();

        // this.x += speed;
        break;
      case Direction.Left:
        this.boardPosition.x -= 1;
        this.board.aGrid.placeAt(
          this.boardPosition.x,
          this.boardPosition.y,
          this
        );
        this.moveCooldownTime = Date.now();

        // this.x -= speed;
        break;
    }
  }

  correctPosition(x: number, y: number) {
    this.boardPosition.x = x;
    this.boardPosition.y = y;
    this.board.aGrid.placeAt(x, y, this);
  }
}
