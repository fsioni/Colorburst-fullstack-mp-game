import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./Login/Login";
import App from "./components/App";

import "./phaser/game.ts";

ReactDOM.createRoot(document.getElementById("react") as HTMLElement).render(
  <React.StrictMode>
    <App />
    <Login />
  </React.StrictMode>
);
