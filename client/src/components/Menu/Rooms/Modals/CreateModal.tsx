import React, { useEffect, useState } from "react";
import { FC } from "react";
import "./CreateModal.css";
import { CgClose } from "react-icons/cg";
import RoomName from "./ModalComponents/RoomName";
import NbPlayers from "./ModalComponents/NbPlayers";
import IsPrivate from "./ModalComponents/IsPrivate";
import SubmitAndReset from "./ModalComponents/SubmitAndReset";

interface Props {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateModal: FC<Props> = ({ modalIsOpen, setModalIsOpen }) => {
  const [_roomName, setRoomName] = useState<string>("");
  const [_nbPlayers, setNbPlayers] = useState<number>(20);
  const [_isPrivate, setIsPrivate] = useState<boolean>(false);
  const [message, setMessage] = useState("");

  const apiOrigin =
    window.location.origin.split(":")[0] +
    ":" +
    window.location.origin.split(":")[1] +
    ":3040";

  const handleSubmit = async (e: any) => {
    console.log("OKKKKKKKK");
    e.preventDefault();
    try {
      const res = await fetch(apiOrigin + "/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: "6009",
          nbPlayers: "1",
          roomName: _roomName,
          playersMax: _nbPlayers,
          isPrivate: _isPrivate,
        }),
      });
      if (res.status === 200) {
        // on succes
        setRoomName("");
        setNbPlayers(20);
        setIsPrivate(false);
        setMessage("Room created successfully ✅");
        setModalIsOpen(false);
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
            <NbPlayers _nbPlayers={_nbPlayers} setNbPlayers={setNbPlayers} />
            <IsPrivate _isPrivate={_isPrivate} setIsPrivate={setIsPrivate} />
          </div>
          <SubmitAndReset />
        </form>
      </div>
    </div>
  );
};

export default CreateModal;
