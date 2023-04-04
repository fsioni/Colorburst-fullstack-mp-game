import React from "react";
import { FC } from "react";
import "./CreateButton.css";

interface Props {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateButton: FC<Props> = ({ setModalIsOpen }) => {
  return (
    <div className="create-button-container">
      <button className="create-button" onClick={() => setModalIsOpen(true)}>
        +
      </button>
    </div>
  );
};

export default CreateButton;
