import { Socket } from "socket.io";
import { Direction } from "../enums/Direction";
import { Stats } from "../enums/Stats";
import PlayerGameStats from "./PlayerGameStats";

export default class Player {
  id: string;
  pseudo: string;
  direction: Direction;
  position: {
    x: number;
    y: number;
  };
  gameStats: PlayerGameStats;
  color: string;
  score: number;
  isAlive: boolean;
  socketID: string;
  socket: Socket;

  constructor(socket: Socket) {
    this.socketID = socket.id;
    this.socket = socket;
    this.id = "";
    this.pseudo = "";
    this.direction = Direction.Up;
    this.position = { x: 0, y: 0 };
    this.gameStats = new PlayerGameStats();
    this.color = "";
    this.score = 0;
    this.isAlive = false;
  }

  ChangeDirection(direction: Direction): void {
    if (direction < 0 || direction > 3) return;
    if (this.direction === direction) return;

    this.direction = direction;
  }

  Move(): void {
    //Todo: vérifications

    switch (this.direction) {
      case Direction.Up:
        this.position.y += 1;
        break;
      case Direction.Down:
        this.position.y -= 1;
        break;
      case Direction.Left:
        this.position.x -= 1;
        break;
      case Direction.Right:
        this.position.x += 1;
        break;
    }

    this.gameStats.Add(Stats.BLOCK_TRAVELLED, 1);
  }

  Kill(): void {
    this.isAlive = false;
  }
}
