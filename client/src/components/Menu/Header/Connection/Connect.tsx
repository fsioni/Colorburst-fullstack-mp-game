/* eslint-disable react/react-in-jsx-scope */
import { useState, FC } from "react";
import ConnectionModal from "./ConnectionModal";
import { FaUserAlt } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import app from "../../../../Firebase";
import "./Connect.css";

interface ConnectProps {
  isConnectionModalOpen: boolean;
  setIsConnectionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Connect: FC<ConnectProps> = (props): JSX.Element => {
  const { isConnectionModalOpen, setIsConnectionModalOpen } = props;
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);

  return !user ? (
    <div className="connexion-area-container">
      <button
        className="connexion-button"
        onClick={() => setIsConnectionModalOpen(true)}
      >
        Log in
      </button>
    </div>
  ) : (
    <div className="connexion-area-container">
      {/* 
      <button className="icon-account-container">
        <FaUserAlt className="icon-account" />
      </button> */}
      <button
        className="icon-logout-container"
        onClick={() => {
          auth.signOut();
          setIsConnectionModalOpen(false);
        }}
      >
        <RxExit className="icon-logout" />
      </button>
    </div>
  );
};

export default Connect;
