import Cell from "./Cell";
import Player from "./Player";

export default class Board {
  boardCells: Cell[][];
  boardSize: number;

  constructor(boardSize: number) {
    this.boardCells = [];
    this.boardSize = boardSize;
    this.clearBoard();
  }

  clearBoard(): void {
    for (let i = 0; i < this.boardSize; i++) {
      this.boardCells[i] = [];
      for (let j = 0; j < this.boardSize; j++) {
        this.boardCells[i][j] = new Cell();
      }
    }
  }

  unionFind() {
    throw new Error("not Implemented");
  }

  spawn(player: Player) {
    throw new Error("not Implemented");
  }

  clearPlayerTerritory(player: Player) {
    throw new Error("not Implemented");
  }
}
