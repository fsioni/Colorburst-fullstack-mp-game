import React, { useEffect, useState } from "react";
import { config } from "../phaser/config";
import "./Game.css";

function Game() {
  const [game, setGame] = useState<Phaser.Game>();

  useEffect(() => {
    setGame(new Phaser.Game(config));
  }, []);

  return (
    <div>
      <div id="phaser"></div>
      <table className="scoreBoard">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody id="scoreBoardBody"></tbody>
      </table>
    </div>
  );
}

export default Game;
