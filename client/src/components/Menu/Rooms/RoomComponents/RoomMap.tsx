import React, { FC, useState } from "react";
import "./RoomMap.css";
import SingleRoom from "./SingleRoom/SingleRoom";
import Room from "../RoomModel";
import CreateButton from "../RoomComponents/CreateButton";

interface Props {
  rooms: Room[];
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsConnectionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const Rooms: FC<Props> = ({
  rooms,
  setModalIsOpen,
  setIsConnectionModalOpen,
  setIsGameStarted,
}) => {
  return rooms.length == 0 ? (
    <div className="rooms-empty">
      ✖️ No rooms ✖️
      <CreateButton
        setModalIsOpen={setModalIsOpen}
        setIsConnectionModalOpen={setIsConnectionModalOpen}
      />
    </div>
  ) : (
    <div className="rooms-and-buttons-container">
      <div className="rooms-container">
        {rooms.map((room) => (
          <div key={room.gameID}>
            <SingleRoom
              gameID={room.gameID}
              gameName={room.gameName}
              connectedPlayersCount={room.connectedPlayersCount}
              nbPlayersMax={room.nbPlayersMax}
              isPrivate={room.isPrivate}
              setIsConnectionModalOpen={setIsConnectionModalOpen}
              setIsGameStarted={setIsGameStarted}
            />
          </div>
        ))}
      </div>
      <CreateButton
        setModalIsOpen={setModalIsOpen}
        setIsConnectionModalOpen={setIsConnectionModalOpen}
      />
    </div>
  );
};

export default Rooms;
