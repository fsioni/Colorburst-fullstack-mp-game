import React, { FC, useRef } from "react";
import { BiArrowBack } from "react-icons/bi";
import "./JoinModal.css";
import {
  getAuth,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
} from "firebase/auth";

interface Props {
  gameID: string;
  gamePassword: string;
  setJoinModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setGamePassword: React.Dispatch<React.SetStateAction<string>>;
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const JoinModal: FC<Props> = ({
  gameID,
  gamePassword,
  setJoinModalOpen,
  setGamePassword,
  setIsGameStarted,
}) => {
  const handleChange = (event: any): any => {
    event.preventDefault();
    setGamePassword(event.target.value);
  };

  const onJoinCLick = () => {
    localStorage.setItem("gamePassword", gamePassword);
    localStorage.setItem("gameId", gameID);

    setIsGameStarted(true);
  };

  return (
    <div className="join-modal-container">
      <span className="back-icon" onClick={(e) => setJoinModalOpen(false)}>
        <BiArrowBack />
      </span>
      <input
        className="password-input"
        id="passwordInput"
        type="text"
        placeholder="Password 🔓"
        required
        minLength={1}
        maxLength={10}
        onChange={(e) => handleChange(e)}
      />
      <button className="submit-password" onClick={() => onJoinCLick()}>
        GO
      </button>
    </div>
  );
};

export default JoinModal;
