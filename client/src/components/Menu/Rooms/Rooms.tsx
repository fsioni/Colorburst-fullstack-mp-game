import React, { FC, useState, useEffect } from "react";
import "./Rooms.css";
import Room from "./RoomModel";
import CreateModal from "./Modals/CreateModal";
import ReloadButton from "./RoomComponents/ReloadButton";
import RoomMap from "./RoomComponents/RoomMap";

interface Props {
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setIsConnectionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Rooms: FC<Props> = ({ setIsGameStarted, setIsConnectionModalOpen }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const apiOrigin =
    window.location.origin.split(":")[0] +
    ":" +
    window.location.origin.split(":")[1] +
    ":3040";

  const fetchRooms = async () => {
    const rooms = await fetch(apiOrigin + "/rooms");
    const jsonRooms = await rooms.json();
    setRooms(jsonRooms);
    setTimeout(() => {
      setLoading(false);
    }, 1250);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    if (isLoading) {
      fetchRooms();
    }
  }, [isLoading]);

  return (
    <div className="main-room-container">
      {modalIsOpen ? ( // Si le modal est ouvert et que l'utilisateur est authentifier
        <CreateModal
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          setIsGameStarted={setIsGameStarted}
        />
      ) : (
        <div className="game-container">
          <ReloadButton isLoading={isLoading} setLoading={setLoading} />
          <h2 className="menu-game-title">🕹️ GAME 🕹️</h2>
          <RoomMap
            rooms={rooms}
            setModalIsOpen={setModalIsOpen}
            setIsConnectionModalOpen={setIsConnectionModalOpen}
            setIsGameStarted={setIsGameStarted}
          />
        </div>
      )}
    </div>
  );
};

export default Rooms;
