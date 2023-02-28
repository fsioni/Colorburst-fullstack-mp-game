import React, { FC } from "react";
import "./App.css";
import HeadMenu from "./Menu/Header/HeadMenu";
import InputField from "./Menu/InputField";
import Rooms from "./Menu/Rooms/Rooms";
import Statistics from "./Menu/Stats/Statistics";
import Game from "./Game";
import app from "../Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const App: FC = () => {
  const [isConnected, setIsConnected] = React.useState(false);

  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  });

  return (
    <>
      {isConnected ? (
        <Game />
      ) : (
        <div className="App">
          <HeadMenu />
          <div className="inputF-container">
            <InputField username={""} isLoged={0} />
          </div>
          <div className="statsAndRooms-container">
            <Rooms />
            <Statistics />
          </div>
        </div>
      )}
    </>
  );
};

export default App;
