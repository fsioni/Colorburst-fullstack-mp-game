import React, { useEffect, useState } from "react";
import { config } from "../phaser/config";
import HeadMenu from "./Menu/Header/HeadMenu";

function Game() {
  const [game, setGame] = useState<Phaser.Game>();

  useEffect(() => {
    setGame(new Phaser.Game(config));
  }, []);

  return (
    <>
      <HeadMenu />
      <div id="phaser"></div>
    </>
  );
}

export default Game;
