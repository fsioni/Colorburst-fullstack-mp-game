import React, { FC, useEffect, useState } from "react";
import { config } from "../phaser/utils/config";
import "./Game.css";

interface GameProps {
  setGameStarted: (arg: boolean) => void;
}

const Game: FC<GameProps> = ({ setGameStarted }): JSX.Element => {
  const [game, setGame] = useState<Phaser.Game>();

  useEffect(() => {
    setGame(new Phaser.Game(config));
  }, []);

  return (
    <>
      <div className="transitionScreen" />
      <button
        className="quitButton"
        onClick={() => {
          setGameStarted(false);
          game?.destroy(true);
        }}
      >
        Quit
      </button>

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

      <canvas id="miniMap" className="miniMap"></canvas>

      <img id="soundBtn" src="./ress/mute.png" alt="" />
    </>
  );
};
export default Game;
