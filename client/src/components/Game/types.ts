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
  ): void => {
    const xCoord = x * cellSize;
    const yCoord = y * cellSize;

    if (
      x < 0 ||
      y < 0 ||
      xCoord > ctx.canvas.width ||
      yCoord > ctx.canvas.height
    )
      return;
    if (this.occupiedBy) {
      ctx.fillStyle = fillColors.cell;
    } else {
      ctx.fillStyle = fillColors.emptyCell;
    }

    ctx.fillRect(xCoord, yCoord, cellSize, cellSize);
    ctx.strokeStyle = fillColors.cellBorder;
    ctx.strokeRect(xCoord, yCoord, cellSize, cellSize);
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

  draw = (ctx: CanvasRenderingContext2D, cellSize: number) => {
    console.log("drawing game board");

    ctx.fillStyle = fillColors.player;
    for (let i = 0; i < this.length; i++) {
      for (let j = 0; j < this.length; j++) {
        this.getCell(i, j).draw(ctx, i, j, cellSize);
      }
    }
  };
}
