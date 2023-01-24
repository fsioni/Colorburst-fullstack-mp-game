import fillColors from "./CanvasFillColors";

export class Cell {
  occupiedBy: string | null;
  trailsBy: string | null;
  constructor() {
    this.occupiedBy = null;
    this.trailsBy = null;
  }

  draw = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    cellSize: number
  ) => {
    if (this.occupiedBy) {
      ctx.fillStyle = fillColors.cell;
    } else {
      ctx.fillStyle = fillColors.emptyCell;
    }

    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    ctx.strokeStyle = fillColors.cellBorder;
    ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
  };
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
