import React from "react";
import { FC, useState, useEffect } from "react";

import "./Rooms.css";
import jsonListRoom from "../../../data/roomList.json";
import SingleRoom from "./SingleRoom/SingleRoom";
import Room from "./RoomModel"; // a utiliser pour les props
import CreateModal from "./Modals/CreateModal";

const Rooms: FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const apiOrigin =
    window.location.origin.split(":")[0] +
    ":" +
    window.location.origin.split(":")[1] +
    ":3040";

  useEffect(() => {
    const fetchRooms = async () => {
      const rooms = await fetch(apiOrigin + "/rooms");
      const jsonRooms = await rooms.json();
      setRooms(jsonRooms);
    };
    fetchRooms();
  }, []);

  const roomsMap = () => {
    return (
      <div className="rooms-container">
        {rooms.map((room) => (
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
    );
  };

  const buttons = () => {
    return (
      <div className="buttons-container">
        <button className="join-button">JOIN</button>
        <button className="create-button" onClick={() => setOpen(true)}>
          CREATE
        </button>
      </div>
    );
  };

  return (
    <div className="main-room-container">
      {open == false ? (
        <div className="game-container">
          <h2 className="menu-game-title">🕹️ GAME 🕹️</h2>
          {rooms.length == 0 ? (
            <div className="rooms-empty">✖️ No rooms ✖️</div>
          ) : (
            <div className="rooms-and-buttons-container">
              {roomsMap()}
              {buttons()}
            </div>
          )}
        </div>
      ) : (
        <CreateModal open={open} setOpen={setOpen} />
      )}
    </div>
  );
};

export default Rooms;
