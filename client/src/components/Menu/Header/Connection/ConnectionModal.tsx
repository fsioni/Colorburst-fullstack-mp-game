import React, { FC } from "react";
import "./ConnectionModal.css";
import { FaWindowClose } from "react-icons/fa";
import GoogleLoginButton from "../../../LoginButtons/GoogleLoginButton";
import AnonymousLoginButton from "../../../LoginButtons/AnonymousLoginButton";

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
            <h2 className="heading">LOG IN</h2>
          </div>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            <FaWindowClose style={{ marginBottom: "-3px" }} />
          </button>
          <div className="modalContent">Choose your connection method</div>
          <div className="modalActions">
            <div className="actionsContainer">
              <GoogleLoginButton />
              <AnonymousLoginButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectionModal;
