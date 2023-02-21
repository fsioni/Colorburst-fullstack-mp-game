import React, { FC } from "react";
import "./ConnectionModal.css";
import { RiCloseLine } from "react-icons/ri";

interface Props {
  setIsOpen: (isOpen: boolean) => void;
}

const ConnectionModal: FC<Props> = ({ setIsOpen }): JSX.Element => {
  return (
    <>
      <div className="dark_bg" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h2 className="heading">Log in</h2>
          </div>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className="modalContent">Connection buttons</div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button className="actionBtn">Login</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectionModal;
