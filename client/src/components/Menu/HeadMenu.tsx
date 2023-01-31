import React from "react";
import Connect from "./Connect";
import "./HeadMenu.css";

const HeadMenu = () => {
  return (
    <div className="header">
      <h1 className="game__tile">ColorBurst</h1>
      <Connect />
    </div>
  );
};

export default HeadMenu;
