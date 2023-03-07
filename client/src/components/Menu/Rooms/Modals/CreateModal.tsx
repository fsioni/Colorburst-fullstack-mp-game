import React from "react";
import { FC } from "react";
import "./CreateModal.css";
import { CgClose } from "react-icons/cg";

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
        <form className="creat-form">
          <div className="form-field-container">
            <div className="name-container">
              <p className="name-title">Name :</p>
              <input
                className="name-input"
                id="roomName"
                type="text"
                placeholder="Room name"
              />
            </div>
            <div className="players-and-privat-container">
              <div className="nb-players-container">
                <p className="nb-players-tile">Players</p>
                <input
                  className="number-players-input"
                  type="number"
                  id="nbMaxPlayers"
                  name="tentacles"
                  min="10"
                  max="100"
                  step="10"
                />
              </div>
              <div className="private-container">
                <p className="private-title">Private</p>
              </div>
            </div>
          </div>
          <div className="submit-container">
            <input
              className="submit-input"
              id="submit"
              type="submit"
              value="Submit"
            />
            <input
              className="reset-input"
              id="reset"
              type="reset"
              value="Reset"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateModal;
