import React, { useEffect, useRef, useState } from "react";
import draw from "./CanvasRenderFunctions";
import { GameBoard } from "./types";
import "./Canvas.css";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastRenderTimeRef = useRef<number>();

  const gameBoard: GameBoard = new GameBoard(200);

  const maxCells = 24;

  const [cellSize, setCellSize] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let animationFrameId: number;

    function handleResize(canvas: HTMLCanvasElement) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const newCellSize = Math.max(canvas.width, canvas.height) / maxCells;
      setCellSize(newCellSize);
    }
    handleResize(canvas);
    window.addEventListener("resize", () => handleResize(canvas));

    //Our draw came here
    const render = () => {
      draw(context, gameBoard, cellSize, lastRenderTimeRef);
      lastRenderTimeRef.current = Date.now();
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [gameBoard, draw, cellSize]);

  return (
    <div>
      <canvas className="game" ref={canvasRef}></canvas>
    </div>
  );
};

export default Canvas;
