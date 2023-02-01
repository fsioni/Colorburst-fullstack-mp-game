import React, { FC } from "react";

import io from "socket.io-client";
const socket = io("http://localhost:3000");

import HeadMenu from "./components/Menu/HeadMenu";
import Statistics from "./components/Menu/Statistics";

const App: FC = () => {
  return (
    <div className="App">
      <HeadMenu />
      <Statistics />
    </div>
  );
};

export default App;
