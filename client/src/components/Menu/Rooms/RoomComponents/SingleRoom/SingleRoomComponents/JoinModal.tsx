import React, { FC } from "react";
import { BiArrowBack } from "react-icons/bi";
import "./JoinModal.css";

interface Props {
  setJoinModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setGamePassword: React.Dispatch<React.SetStateAction<string>>;
}

const JoinModal: FC<Props> = ({ setJoinModalOpen, setGamePassword }) => {
  const handleChange = (event: any): any => {
    event.preventDefault();
    setGamePassword(event.target.value);
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
      <button className="submit-password">GO</button>
    </div>
  );
};

export default JoinModal;
