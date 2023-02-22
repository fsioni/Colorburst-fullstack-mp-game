import React from "react";
import { FC } from "react";

import "./Rooms.css";
import jsonListRoom from "../../../data/roomList.json";
import SingleRoom from "./SingleRoom";
//import Room from "./RoomModel"; A utiliser plus tard avec les props

const Rooms: FC = () => {
  return (
    <div className="room-container">
      <h2 className="menu-game-title">🕹️ ROOMS 🕹️</h2>
      {jsonListRoom.roomList.map((room) => (
        <div key={room.roomId}>
          <SingleRoom
            roomId={room.roomId}
            roomName={room.roomName}
            nbPlayers={room.nbPlayers}
            playersMax={room.playersMax}
            isPrivate={room.isPrivate}
            password={room.password}
          />
        </div>
      ))}
      <button className="join-button">JOIN</button>
      <button className="create-button">CREATE</button>
    </div>
  );
};

export default Rooms;
