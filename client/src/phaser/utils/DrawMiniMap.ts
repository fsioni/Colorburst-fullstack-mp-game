import Board from "../gameObjects/Board";

const DrawMiniMap = (board: Board) => {
  const beginTime = Date.now();
  const miniMap = document.getElementById("miniMap") as HTMLCanvasElement;
  if (!miniMap) return;
  const ctx = miniMap.getContext("2d");
  if (!ctx) return;

  const mapWidth = board.size.x;
  const mapHeight = board.size.y;
  miniMap.width = mapWidth;
  miniMap.height = mapHeight;

  // Transparent background
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";

  ctx.fillStyle = "rgba(255, 0, 0, 0.5)";

  for (let i = 0; i < board.size.x; i++)
    for (let j = 0; j < board.size.y; j++)
      if (board.cells[i][j].occupedBy) ctx.fillRect(i, j, 1, 1);

  const endTime = Date.now();
  console.log(`[map] Draw time: ${endTime - beginTime} ms`);
};

export default DrawMiniMap;
