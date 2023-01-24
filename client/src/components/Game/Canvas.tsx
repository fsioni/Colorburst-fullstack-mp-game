import React, { useEffect, useRef, useState } from "react";
import draw from "./CanvasRenderFunctions";
import { GameBoard } from "./types";
import "./Canvas.css";

const Canvas = () => {
  const canvasRef = useRef(null);
  const gameBoard: GameBoard = new GameBoard(500);

  const maxCells = 20;

  const [cellSize, setCellSize] = useState(20);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let animationFrameId: number;

    function handleResize(canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const newCellSize = Math.min(canvas.width, canvas.height) / maxCells;
      setCellSize(newCellSize);
      console.log("resized to: ", window.innerWidth, "x", window.innerHeight);
    }
    handleResize(canvas);
    window.addEventListener("resize", () => handleResize(canvas));

    //Our draw came here
    const render = () => {
      draw(context, gameBoard, cellSize);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw, cellSize]);

  return (
    <div>
      <canvas
        className="game"
        ref={canvasRef}
        height="400px"
        width="400px"
      ></canvas>
    </div>
  );
};

export default Canvas;
