export class Cell {
  occupiedBy: string | null;
  trailsBy: string | null;

  constructor() {
    this.occupiedBy = null;
    this.trailsBy = null;
  }
}

export class GameBoard {
  cells: Cell[][];
  length: number;

  constructor(size: number) {
    this.cells = [];
    this.length = size;
    for (let i = 0; i < size; i++) {
      this.cells[i] = [];
      for (let j = 0; j < size; j++) {
        this.cells[i][j] = new Cell();
      }
    }
  }

  getCell(x: number, y: number) {
    return this.cells[x][y];
  }
}
