import React from "react";
import { FC, useState } from "react";
import { FaGamepad } from "react-icons/fa";
import { CgClose } from "react-icons/cg";

import "./Rooms.css";
import jsonListRoom from "../../../data/roomList.json";
import SingleRoom from "./SingleRoom";
import Room from "./RoomModel";

const Rooms: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return isOpen ? (
    <div className="room-container-open">
      <span onClick={() => setIsOpen(false)} className="close-icon">
        <CgClose />
      </span>
      <h3 className="menu-stat-tile">Crée / rejoindre une game 🕹️</h3>
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
    </div>
  ) : (
    <div className="room-container-close">
      <span onClick={() => setIsOpen(true)} className="room-icon">
        <FaGamepad />
      </span>
    </div>
  );
};

export default Rooms;
