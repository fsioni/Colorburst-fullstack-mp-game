import { useEffect, useState } from "react";
import { config } from "../phaser/config";

function Game() {
  const [game, setGame] = useState<Phaser.Game>();

  useEffect(() => {
    setGame(new Phaser.Game(config));
  }, []);

  return <div id="phaser"></div>;
}

export default Game;
