import React from "react";
import { FC, useState, useEffect } from "react";

import "./Rooms.css";
import SingleRoom from "./SingleRoom/SingleRoom";
import Room from "./RoomModel"; // a utiliser pour les props
import CreateModal from "./Modals/CreateModal";

const Rooms: FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
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
        <button className="create-button" onClick={() => setModalIsOpen(true)}>
          CREATE
        </button>
      </div>
    );
  };

  return (
    <div className="main-room-container">
      {modalIsOpen == false ? (
        <div className="game-container">
          <h2 className="menu-game-title">🕹️ GAME 🕹️</h2>
          {rooms.length == 0 ? (
            <div className="rooms-empty">
              ✖️ No rooms ✖️
              {buttons()}
            </div>
          ) : (
            <div className="rooms-and-buttons-container">
              {roomsMap()}
              {buttons()}
            </div>
          )}
        </div>
      ) : (
        <CreateModal
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      )}
    </div>
  );
};

export default Rooms;
