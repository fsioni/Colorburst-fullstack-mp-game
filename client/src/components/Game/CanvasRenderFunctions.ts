import { GameBoard } from "./types";

const draw = (
  ctx: CanvasRenderingContext2D,
  gameBoard: GameBoard,
  cellSize: number,
  lastRenderTimeRef: React.MutableRefObject<number | undefined>
) => {
  const timeNow = Date.now();
  if (!lastRenderTimeRef.current) return;
  const deltaTime = timeNow - lastRenderTimeRef.current;

  clearCanvas(ctx);
  gameBoard.draw(ctx, cellSize);
  lastRenderTimeRef.current = timeNow;
};

const clearCanvas = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

export default draw;
