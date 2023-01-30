import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";

import "./phaser/game.ts";

ReactDOM.createRoot(document.getElementById("react") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
