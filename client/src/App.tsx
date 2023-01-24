import React, { useState, useEffect } from "react";

import io from "socket.io-client";
const socket = io("http://localhost:3000");

const keysDirection: string[] = [
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
];
console.log(keysDirection);
export default function App() {
  useEffect(() => {
    // Keyboards events
    document.addEventListener("keydown", (e) => {
      console.log(e.key);
      if (keysDirection.includes(e.key)) {
        socket.emit("directionChange", keysDirection.indexOf(e.key));
      }
    });
  });

  return <div>Client</div>;
}
