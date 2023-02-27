import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import Game from "./components/Game";

ReactDOM.createRoot(document.getElementById("react") as HTMLElement).render(
  <div id="mainDiv">
    <App />
    {/* <Game /> */}
  </div>
);
