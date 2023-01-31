import React, { useEffect, useRef } from "react";
import { Buffer } from "buffer";
import io from "socket.io-client";
const socket = io("http://localhost:3000");

socket.on("playersPositions", (data: any) => {
  // console.log(data);
});

socket.on("map", (...data: any) => {
  const messageData = JSON.stringify(data);
  const messageSize = Buffer.byteLength(messageData);
  const messageSizeInMB = messageSize / Math.pow(10, 6);
  console.log(`Message size: ${messageSizeInMB.toFixed(2)} MB`);
  if (!window.phaserGame) return;
  let board = window.phaserGame.scene.getScene("FirstGameScene").board;
  if (!board) return;
  board = board.cells;
  const map = data[0];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j].territoryOccupiedBy) {
        board[i][j].setFrame(1);
      } else {
        board[i][j].setFrame(0);
      }
    }
  }
});

const keysDirection: string[] = [
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
];

let tempoKey = Date.now();

export default function App() {
  const direction = useRef(Number(0));

  useEffect(() => {
    // Keyboards events
    const KeyHandler = (e: KeyboardEvent) => {
      // Avoid spaming and only accept the right keys
      const keyId = keysDirection.indexOf(e.key);
      if (keyId == -1 || Date.now() - tempoKey < 100) return;
      tempoKey = Date.now();

      direction.current = keysDirection.indexOf(e.key);
      socket.emit("directionChange", keysDirection.indexOf(e.key));
    };
    document.addEventListener("keydown", KeyHandler);
  });

  return <div>App</div>;
}
