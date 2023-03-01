import React from "react";
import { FC, useState, useEffect } from "react";

import "./Rooms.css";
import jsonListRoom from "../../../data/roomList.json";
import SingleRoom from "./SingleRoom";
import Room from "./RoomModel"; // a utiliser pour les props
import CreateModal from "./CreateModal";

const Rooms: FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchRooms = async () => {
      const rooms = await fetch("http://localhost:3040/rooms");
      const jsonRooms = await rooms.json();
      setRooms(jsonRooms);
    };
    fetchRooms();
  }, []);

  return (
    <div className="room-container">
      <h2 className="menu-game-title">🕹️ GAME 🕹️</h2>
      {rooms.length == 0 ? (
        <div className="roomsEmpty">✖️ No rooms ✖️</div>
      ) : (
        rooms.map((room) => (
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
        ))
      )}
      <button className="join-button">JOIN</button>
      <button
        className="create-button"
        onClick={() => console.log("Creat the pop up menu")}
      >
        CREATE
      </button>
      <CreateModal />
    </div>
  );
};

export default Rooms;
