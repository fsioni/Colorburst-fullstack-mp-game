import React from "react";
import { FC } from "react";
import "./CreateModal.css";
import { CgClose } from "react-icons/cg";
import RoomName from "./ModalComponents/RoomName";
import NbPlayers from "./ModalComponents/NbPlayers";
import IsPrivate from "./ModalComponents/IsPrivate";
import SubmitAndReset from "./ModalComponents/SubmitAndReset";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateModal: FC<Props> = ({ open, setOpen }) => {
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
            <RoomName />
            <NbPlayers />
            <IsPrivate />
          </div>
          <SubmitAndReset />
        </form>
      </div>
    </div>
  );
};

export default CreateModal;
