import React, { FC } from "react";
import "./RoomMap.css";
import SingleRoom from "./SingleRoom/SingleRoom";
import Room from "../RoomModel";
import CreateButton from "../RoomComponents/CreateButton";

interface Props {
  rooms: Room[];
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Rooms: FC<Props> = ({ rooms, setModalIsOpen }) => {
  return rooms.length == 0 ? (
    <div className="rooms-empty">
      ✖️ No rooms ✖️
      <CreateButton setModalIsOpen={setModalIsOpen} />
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
            />
          </div>
        ))}
      </div>
      <CreateButton setModalIsOpen={setModalIsOpen} />
    </div>
  );
};

export default Rooms;
