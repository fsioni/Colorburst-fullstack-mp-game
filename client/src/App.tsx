import React, { useState, useEffect, FC } from "react";

import io from "socket.io-client";
const socket = io("http://localhost:3000");

import HeadMenu from "./components/Menu/HeadMenu";

const App: FC = () => {
  return (
    <div className="App">
      <HeadMenu />
    </div>
  );
};

export default App;
