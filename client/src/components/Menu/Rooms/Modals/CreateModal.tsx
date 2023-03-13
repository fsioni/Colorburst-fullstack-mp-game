import React, { useEffect, useState } from "react";
import { FC } from "react";
import "./CreateModal.css";
import { CgClose } from "react-icons/cg";
import RoomName from "./ModalComponents/RoomName";
import NbPlayers from "./ModalComponents/NbPlayers";
import IsPrivate from "./ModalComponents/IsPrivate";
import SubmitAndReset from "./ModalComponents/SubmitAndReset";
import { use } from "matter";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const createRooms = () => {
  const formInfo = {};
};

const handleSubmit = (event: any) => {
  event.preventDefault();
  console.log(event.target.elements.username.value);
  console.log(event.target.username.value);
};

const CreateModal: FC<Props> = ({ open, setOpen }) => {
  const [roomName, setRoomName] = useState<string>("");
  const [nbPlayers, setNbPlayers] = useState<number>(0);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  return (
    <div className="create-container">
      <div className="close-icon-container">
        <span className="close-icon" onClick={() => setOpen(false)}>
          <CgClose />
        </span>
      </div>
      <h2 className="title">⚒️ Game Creation ⚒️</h2>
      <div className="form-container">
        <form className="imputs-form">
          <div className="form-field-container">
            <RoomName roomName={roomName} setRoomName={setRoomName} />
            <NbPlayers nbPlayers={nbPlayers} setNbPlayers={setNbPlayers} />
            <IsPrivate isPrivate={isPrivate} setIsPrivate={setIsPrivate} />
          </div>
          <SubmitAndReset />
        </form>
      </div>
    </div>
  );
};

export default CreateModal;
