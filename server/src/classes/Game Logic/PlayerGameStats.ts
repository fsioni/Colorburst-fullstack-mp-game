import { Stats } from "./enums/Stats";
export default class name {
  kills: number;
  killed: number;
  blocksCaptured: number;
  blocksTravelled: number;

  constructor() {
    this.kills = 0;
    this.killed = 0;
    this.blocksCaptured = 0;
    this.blocksTravelled = 0;
  }

  Add(type: Stats, amount: number): void {
    switch (type) {
      case Stats.KILL:
        this.kills += amount;
        break;
      case Stats.KILLED:
        this.killed += amount;
        break;
      case Stats.BLOCK_CAPTURED:
        this.blocksCaptured += amount;
        break;
      case Stats.BLOCK_TRAVELLED:
        this.blocksTravelled += amount;
        break;
      default:
        break;
    }
  }
}
