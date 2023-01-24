import fillColors from "./CanvasFillColors";
import { GameBoard } from "./types";

const draw = (
  ctx: CanvasRenderingContext2D,
  gameBoard: GameBoard,
  cellSize: number
) => {
  clearCanvas(ctx);
  ctx.fillStyle = fillColors.player;
  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard.length; j++) {
      gameBoard.getCell(i, j).draw(ctx, i, j, cellSize);
    }
  }
};

const clearCanvas = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

export default draw;
