import Cell from "./Cell";
import Player from "./Player";
import { playersPositions } from "./interfaces";

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

  unionFind(): void {
    throw new Error("not Implemented");
  }

  // Function to occupe the cells around the player
  // If size is 2, it will occupe 5*5 cells
  occupeCells(
    playersPositions: playersPositions,
    size: number,
    playerId: string
  ): void {
    const { x, y } = playersPositions;
    for (let i = x - size; i <= x + size; i++) {
      for (let j = y - size; j <= y + size; j++) {
        if (i >= 0 && i < this.boardSize && j >= 0 && j < this.boardSize) {
          this.boardCells[i][j].territoryOccupiedBy = playerId;
        }
      }
    }
  }

  clearPlayerTerritory(player: Player): void {
    throw new Error("not Implemented");
  }
}
