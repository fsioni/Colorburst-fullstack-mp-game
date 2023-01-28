import React, { useEffect, useRef } from "react";

import io from "socket.io-client";
const socket = io("http://localhost:3000");

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

  return (
    <div>
      <h1>ColorBurst</h1>
    </div>
  );
}
