import React from "react";
import "./Rules.css";

function Rules() {
  return (
    <div className="rules-panel">
      <div className="rules-container">
        <h1>📏 Rules 📏</h1>
        <ul>
          <li>
            <b>Objective:</b> The objective of the game is to paint as much of
            the map as possible with your color while avoiding other players.
          </li>
          <li>
            <b>Controls:</b> Use the arrow keys to move in the desired
            direction.
          </li>
          <li>
            <b>Starting the game:</b> At the beginning of the game, you will be
            placed on a blank map. Choose a skin and start painting the map.
          </li>
          <li>
            <b>Avoid other players:</b> Avoid other players who try to block or
            eliminate you. If another player (or yourself) collide with your
            trail, you lose and must start over.
          </li>
          <li>
            <b>Gain points:</b> You gain points by painting the map. You can
            also steal other players points when you eliminate them!
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Rules;
