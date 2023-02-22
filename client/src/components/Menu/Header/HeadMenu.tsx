import React from "react";
import Connect from "./Connection/Connect";
import "./HeadMenu.css";

const HeadMenu = () => {
  return (
    <div className="header-container">
      <h1 className="game-title">ColorBurst</h1>
      <Connect />
    </div>
  );
};

export default HeadMenu;
