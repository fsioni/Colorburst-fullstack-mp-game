import React, { useState, useEffect } from "react";

import * as io from "socket.io-client";

const socket: io.Socket = io.io("http://localhost:3000");

export default function App() {
  return <div>Client</div>;
}
