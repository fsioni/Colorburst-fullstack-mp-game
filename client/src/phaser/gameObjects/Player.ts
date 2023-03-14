import { Socket } from "socket.io-client";
import Phaser from "phaser";
import { Direction } from "../Direction";
import Board from "./Board";
import Point = Phaser.Geom.Point;

const moveInterpolationRatio = 0.01;
const rotaInterpolationRatio = 0.01;

export default class Player extends Phaser.GameObjects.Sprite {
  direction: Direction | null = null;
  isPlayable = false;
  id: string;
  isAlive = true;
  socket: Socket | null = null;

  lastMoveTime = 0;
  moveCooldownTime = 1000;

  lastMovementChangeTime = 0;
  movementChangeCooldownTime = 100;
  board: Board;

  boardPosition = { x: 0, y: 0 };
  aimedPosition = new Point(0, 0);
  aimedAngle = 0;

  cursors = this.scene.input.keyboard.createCursorKeys();
  color = 0;

  killedAudio = new Audio("../../../ress/killed.mp3");
  gainedTerritoryAudio = new Audio("../../../ress/gain-territory.wav");

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
    this.handleSocketEvents();
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    if (this.isPlayable) {
      this.handleInputs();
    }

    this.handleMovements(delta);
    this.handleRotation(delta);
  }

  handleSocketEvents() {
    if (this.socket) {
      this.socket?.on("gameOver", () => {
        this.killedAudio.play();
      });
      this.socket?.on("gainedTerritory", () => {
        //check if the player has respawned
        console.log(this);

        this.gainedTerritoryAudio.play();
      });
    }
  }

  sendDirectionToSocket() {
    if (!this.socket) {
      return;
    }

    this.socket.emit("directionChange", this.direction);
    this.lastMovementChangeTime = Date.now();
  }

  checkIfDirectionChangeIsAllowed(direction: Direction) {
    if (
      direction === Direction.Up &&
      !(this.direction === Direction.Up) &&
      !(this.direction === Direction.Down)
    ) {
      return true;
    } else if (
      direction === Direction.Down &&
      !(this.direction === Direction.Down) &&
      !(this.direction === Direction.Up)
    ) {
      return true;
    } else if (
      direction === Direction.Right &&
      !(this.direction === Direction.Right) &&
      !(this.direction === Direction.Left)
    ) {
      return true;
    } else if (
      direction === Direction.Left &&
      !(this.direction === Direction.Left) &&
      !(this.direction === Direction.Right)
    ) {
      return true;
    } else {
      return false;
    }
  }

  handleInputs() {
    const canMove = Date.now() - this.lastMoveTime > this.moveCooldownTime;
    if (!canMove) {
      console.log("move cooldown not over");
      return;
    }

    if (
      this.cursors.up.isDown &&
      this.checkIfDirectionChangeIsAllowed(Direction.Up)
    ) {
      this.changeDirection(Direction.Up);
      this.sendDirectionToSocket();
    } else if (
      this.cursors.down.isDown &&
      this.checkIfDirectionChangeIsAllowed(Direction.Down)
    ) {
      this.changeDirection(Direction.Down);

      this.sendDirectionToSocket();
    } else if (
      this.cursors.right.isDown &&
      this.checkIfDirectionChangeIsAllowed(Direction.Right)
    ) {
      this.changeDirection(Direction.Right);
      this.sendDirectionToSocket();
    } else if (
      this.cursors.left.isDown &&
      this.checkIfDirectionChangeIsAllowed(Direction.Left)
    ) {
      this.changeDirection(Direction.Left);
      this.sendDirectionToSocket();
    }
  }

  calculateAimedPosition() {
    const cellPosition = this.board.aGrid.getCellPosition(
      this.boardPosition.x,
      this.boardPosition.y
    );
    this.aimedPosition.x = cellPosition.x;
    this.aimedPosition.y = cellPosition.y;
  }

  calculateBoardPosition() {
    if (this.direction === Direction.Up) {
      this.boardPosition.y -= 1;
    } else if (this.direction === Direction.Down) {
      this.boardPosition.y += 1;
    } else if (this.direction === Direction.Left) {
      this.boardPosition.x -= 1;
    } else if (this.direction === Direction.Right) {
      this.boardPosition.x += 1;
    }

    this.calculateAimedPosition();
    const { x, y } = this.boardPosition;
    this.board.setTrailsBy(x, y, this.id);
  }

  handleMovements(delta: number) {
    const actualPosition = new Point(this.x, this.y);
    const calculatedPosition = new Point(0, 0);
    Phaser.Geom.Point.Interpolate(
      actualPosition,
      this.aimedPosition,
      moveInterpolationRatio * delta,
      calculatedPosition
    );

    this.setPosition(calculatedPosition.x, calculatedPosition.y);
  }

  handleRotation(delta: number) {
    this.rotation = Phaser.Math.Angle.RotateTo(
      this.rotation,
      this.aimedAngle,
      rotaInterpolationRatio * delta
    );
  }

  changeDirection(direction: Direction) {
    this.direction = direction;
    if (this.direction === Direction.Up) {
      this.aimedAngle = Phaser.Math.DegToRad(180);
    } else if (this.direction === Direction.Down) {
      this.aimedAngle = Phaser.Math.DegToRad(0);
    } else if (this.direction === Direction.Left) {
      this.aimedAngle = Phaser.Math.DegToRad(90);
    } else if (this.direction === Direction.Right) {
      this.aimedAngle = Phaser.Math.DegToRad(-90);
    }
  }

  correctPosition(x: number, y: number, direction: number) {
    if (this.direction !== direction) this.changeDirection(direction);

    if (this.boardPosition.x === x && this.boardPosition.y === y) return;

    this.boardPosition.x = x;
    this.boardPosition.y = y;
    const cellPosition = this.board.aGrid.getCellPosition(x, y);
    this.aimedPosition.x = cellPosition.x;
    this.aimedPosition.y = cellPosition.y;
  }
}
