import React, { FC } from "react";
import "./App.css";
import HeadMenu from "./Menu/Header/HeadMenu";
import InputField from "./Menu/InputField";
import Rooms from "./Menu/Rooms/Rooms";
import Statistics from "./Menu/Stats/Statistics";
import Game from "./Game";
import Rules from "./Menu/Rules";

const App: FC = () => {
  const [isGameStarted, setIsGameStarted] = React.useState(false);
  const [isConnectionModalOpen, setIsConnectionModalOpen] =
    React.useState(false);

  return (
    <>
      {isGameStarted ? (
        <Game setGameStarted={setIsGameStarted} />
      ) : (
        <div className="App">
          <HeadMenu
            isConnectionModalOpen={isConnectionModalOpen}
            setIsConnectionModalOpen={setIsConnectionModalOpen}
          />
          <div className="panels-container">
            <Rooms
              setIsGameStarted={setIsGameStarted}
              setIsConnectionModalOpen={setIsConnectionModalOpen}
            />
            <InputField
              setIsGameStarted={setIsGameStarted}
              setIsConnectionModalOpen={setIsConnectionModalOpen}
            />
            <Statistics />
          </div>
          <Rules />
        </div>
      )}
    </>
  );
};

export default App;
