import React, { FC, useEffect, useState } from "react";
import { config } from "../phaser/config";

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
      <button onClick={() => setGameStarted(false)}>Quit</button>
      <div id="phaser"></div>
    </>
  );
};

export default Game;
