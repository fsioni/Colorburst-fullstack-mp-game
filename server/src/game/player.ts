import { Socket } from "socket.io";
import { Direction } from "../enums/Direction";
import { Stats } from "../enums/Stats";
import { playerPosition } from "./interfaces";
import PlayerGameStats from "./playerGameStats";

export default class Player {
  id: string;
  uid: string;
  pseudo = "";
  direction = Direction.Up;
  position = { x: 0, y: 0 } as playerPosition;
  gameStats: PlayerGameStats;
  color = 0;
  score = 0;
  isAlive = false;
  socket: Socket;
  outOfHisTerritory = false;
  constructor(socket: Socket) {
    this.socket = socket;
    this.id = socket.id;
    this.uid = "";
    this.gameStats = new PlayerGameStats();
  }

  ChangeDirection(direction: Direction): void {
    if (direction < 0 || direction > 3) return;
    if (this.direction === direction) return;
    if (this.direction === Direction.Up && direction === Direction.Down) return;
    if (this.direction === Direction.Down && direction === Direction.Up) return;
    if (this.direction === Direction.Left && direction === Direction.Right)
      return;
    if (this.direction === Direction.Right && direction === Direction.Left)
      return;

    this.direction = direction;
  }

  Move(): void {
    //Todo: vérifications

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

    this.gameStats.Add(Stats.BLOCK_TRAVELLED, 1);
  }

  Kill(): void {
    this.isAlive = false;
  }
}
