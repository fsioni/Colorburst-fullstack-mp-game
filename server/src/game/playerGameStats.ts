import { log } from "console";
import { Stats } from "../enums/Stats";
export default class PlayerGameStats {
  private kills: number;
  private killed: number;
  private blocksCaptured: number;
  private blocksTravelled: number;
  private highestScore: number;

  constructor() {
    this.kills = 0;
    this.killed = 0;
    this.blocksCaptured = 0;
    this.blocksTravelled = 0;
    this.highestScore = 0;
  }

  get _kills(): number {
    return this.kills;
  }

  get _killed(): number {
    return this.killed;
  }

  get _blocksCaptured(): number {
    return this.blocksCaptured;
  }

  get _blocksTravelled(): number {
    return this.blocksTravelled;
  }

  get _highestScore(): number {
    return this.highestScore;
  }

  Add(type: Stats, amount: number): void {
    console.log("Adding " + amount + " to " + type);
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
      case Stats.HIGHEST_SCORE:
        console.log("Highest score: " + amount + " > " + this.highestScore);
        if (amount > this.highestScore) {
          this.highestScore = amount;
        }
        break;
    }
  }
}
