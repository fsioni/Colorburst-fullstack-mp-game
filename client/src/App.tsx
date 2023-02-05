import React, { FC } from "react";

import io from "socket.io-client";
const socket = io("http://localhost:3000");

import "./App.css";
import HeadMenu from "./components/Menu/Header/HeadMenu";
import InputFeild from "./components/Menu/InputFeild";
import Rooms from "./components/Menu/Rooms/Rooms";
import Statistics from "./components/Menu/Stats/Statistics";

const App: FC = () => {
  return (
    <div className="App">
      <HeadMenu />
      <div className="main-container">
        <Rooms />
        <InputFeild />
        <Statistics />
      </div>
    </div>
  );
};

export default App;
