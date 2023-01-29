import { Stats } from "../../enums/Stats";
import Board from "./Board";
import Player from "./Player";
import Settings from "../../interfaces/Settings";

export default class Game {
  GameSettings: Settings;
  gameBoard: Board;
  players: Player[];
  isJoinable: boolean;
  constructor() {
    this.GameSettings = {
      boardSize: 600,
      nbPlayersMax: 4,
      isPrivate: false,
      invitationCode: null,
    } as Settings;
    this.gameBoard = new Board(this.GameSettings.boardSize);
    this.players = [];
    this.isJoinable = true;
  }

  Join(): void {
    throw new Error("not Implemented");
  }

  Quit(): void {
    throw new Error("not Implemented");
  }

  Kill(murder: Player, victim: Player): void {
    victim.Kill();
    victim.gameStats.Add(Stats.KILLED, 1);
    murder.gameStats.Add(Stats.KILL, 1);
    throw new Error("not Implemented");
  }
}
