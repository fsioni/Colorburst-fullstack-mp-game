import { Direction } from "./Direction";

export default class Player {
  id: string;
  pseudo: string;
  direction: Direction;
  position: {
    x: number;
    y: number;
  };
  color: string;
  score: number;
  isAlive: boolean;

  constructor() {
    this.id = "";
    this.pseudo = "";
    this.direction = Direction.Up;
    this.position = { x: 0, y: 0 };
    this.color = "";
    this.score = 0;
    this.isAlive = true;
  }

  Move() {
    switch (this.direction) {
      case Direction.Up:
        this.position.y -= 1;
        break;
      case Direction.Down:
        this.position.y += 1;
        break;
      case Direction.Left:
        this.position.x -= 1;
        break;
      case Direction.Right:
        this.position.x += 1;
        break;
    }

    //Todo: vérifications
  }

  Kill() {
    this.isAlive = false;
  }
}
