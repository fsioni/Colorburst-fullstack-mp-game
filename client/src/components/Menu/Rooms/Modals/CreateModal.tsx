import React, { useEffect, useState } from "react";
import { FC } from "react";
import "./CreateModal.css";
import { CgClose } from "react-icons/cg";
import RoomName from "./ModalComponents/RoomName";
import NbPlayersMax from "./ModalComponents/NbPlayersMax";
import IsPrivate from "./ModalComponents/IsPrivate";
import SubmitAndReset from "./ModalComponents/SubmitAndReset";
import MapSize from "./ModalComponents/MapSize";

interface Props {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateModal: FC<Props> = ({
  modalIsOpen,
  setModalIsOpen,
  setIsGameStarted,
}) => {
  const [_roomName, setRoomName] = useState<string>("");
  const [_nbPlayersMax, setNbPlayersMax] = useState<number>(20);
  const [_boardSize, setBoardSize] = useState<number>(50);
  const [_isPrivate, setIsPrivate] = useState<boolean>(false);
  const [message, setMessage] = useState("");

  const apiOrigin =
    window.location.origin.split(":")[0] +
    ":" +
    window.location.origin.split(":")[1] +
    ":3040";

  const handleSubmit = async (e: any) => {
    console.log("Room submited");
    e.preventDefault();
    try {
      const res = await fetch(apiOrigin + "/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomName: _roomName,
          nbPlayersMax: _nbPlayersMax,
          boardSize: _boardSize,
          isPrivate: _isPrivate,
        }),
      });
      console.log(res.status);
      if (res.status === 200) {
        const data = await res.json();
        const roomId = data.roomId;
        localStorage.setItem("gameId", roomId);
        setRoomName("");
        setNbPlayersMax(20);
        setBoardSize(50);
        setIsPrivate(false);
        setMessage("Room created successfully ✅");
        setModalIsOpen(false);
        setIsGameStarted(true);
      } else {
        setMessage("Error occured ❌");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create-container">
      <div className="close-icon-container">
        <span className="close-icon" onClick={() => setModalIsOpen(false)}>
          <CgClose />
        </span>
      </div>
      <h2 className="title">⚒️ Game Creation ⚒️</h2>
      <div className="form-container">
        <form className="imputs-form" onSubmit={handleSubmit}>
          <div className="form-field-container">
            <RoomName _roomName={_roomName} setRoomName={setRoomName} />
            <NbPlayersMax
              _nbPlayers={_nbPlayersMax}
              setNbPlayers={setNbPlayersMax}
            />
            <MapSize _boardSize={_boardSize} setBoardSize={setBoardSize} />
            <IsPrivate _isPrivate={_isPrivate} setIsPrivate={setIsPrivate} />
          </div>
          <SubmitAndReset />
        </form>
      </div>
    </div>
  );
};

export default CreateModal;
