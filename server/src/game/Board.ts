import Cell from "./Cell";
import Player from "./player";
import { playerPosition } from "./interfaces";

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
  occupeCellsSpawn(playerPosition: playerPosition, playerId: string): void {
    console.log("occupeCellsSpawn", playerPosition, playerId);
    const spawnSize = 2;
    const { x, y } = playerPosition;
    for (let i = x - spawnSize; i <= x + spawnSize; i++) {
      for (let j = y - spawnSize; j <= y + spawnSize; j++) {
        if (i >= 0 && i < this.boardSize && j >= 0 && j < this.boardSize) {
          this.boardCells[i][j].territoryOccupiedBy = playerId;
        }
      }
    }
  }

  freeCells(playerId: string): void {
    const toFree = this.boardCells.flat().filter((cell) => {
      return cell.territoryOccupiedBy === playerId;
    });
    toFree.forEach((cell) => {
      cell.territoryOccupiedBy = null;
    });
  }

  clearPlayerTerritory(player: Player): void {
    throw new Error("not Implemented");
  }
}
