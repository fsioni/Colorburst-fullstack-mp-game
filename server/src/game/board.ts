import Cell from "./cell";
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
      return (
        cell.territoryOccupiedBy === playerId || cell.trailsBy === playerId
      );
    });

    toFree.forEach((cell) => {
      if (cell.territoryOccupiedBy == playerId) cell.territoryOccupiedBy = null;
      if (cell.trailsBy == playerId) cell.trailsBy = null;
    });
  }

  getCell(position: playerPosition): Cell | null {
    const { x, y } = position;

    return this.boardCells[x][y];
  }

  setTrail(player: Player): void {
    const { x, y } = player.position;
    this.boardCells[x][y].trailsBy = player.id;
  }

  isInBoard(player: Player): boolean {
    const { x, y } = player.position;
    return x >= 0 && x < this.boardSize && y >= 0 && y < this.boardSize;
  }
}
