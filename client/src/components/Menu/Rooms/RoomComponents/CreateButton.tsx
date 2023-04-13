import React from "react";
import { FC } from "react";
import "./CreateButton.css";
import { MdOutlineAdd } from "react-icons/md";

interface Props {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateButton: FC<Props> = ({ setModalIsOpen }) => {
  return (
    <div>
      <button className="create-button" onClick={() => setModalIsOpen(true)}>
        <MdOutlineAdd className="add-icon" />
      </button>
    </div>
  );
};

export default CreateButton;
