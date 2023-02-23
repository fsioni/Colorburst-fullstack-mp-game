import React, { FC } from "react";
import "./ConnectionModal.css";
import { RiCloseLine } from "react-icons/ri";
import GoogleLoginButton from "../../../LoginButtons/GoogleLoginButton";

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
          <div className="modalContent">Choose your connection method</div>
          <div className="modalActions">
            <div className="actionsContainer">
              <GoogleLoginButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectionModal;
