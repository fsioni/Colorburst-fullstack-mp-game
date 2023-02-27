import React, { FC } from "react";
import "./App.css";
import HeadMenu from "./Menu/Header/HeadMenu";
import InputField from "./Menu/InputField";
import Rooms from "./Menu/Rooms/Rooms";
import Statistics from "./Menu/Stats/Statistics";

const App: FC = () => {
  return (
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
  );
};

export default App;
