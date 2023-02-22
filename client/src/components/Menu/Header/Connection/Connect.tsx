/* eslint-disable react/react-in-jsx-scope */
import { useState, FC } from "react";
import ConnectionModal from "./ConnectionModal";
import { FaUserAlt } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import app from "../../../../Firebase";
import "./Connect.css";

const Connect: FC = (): JSX.Element => {
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);

  const [isConnectionModalOpen, setIsConnectionModalOpen] = useState(false);

  return !user ? (
    <div className="connexion-area-container">
      <button
        className="connexion-button"
        // A changer renvoie l'id du joueur connecté
        onClick={() => setIsConnectionModalOpen(true)}
      >
        Log in
      </button>
      {isConnectionModalOpen && (
        <ConnectionModal
          setIsOpen={function (isOpen: boolean): void {
            setIsConnectionModalOpen(isOpen);
          }}
        />
      )}
    </div>
  ) : (
    <div className="connexion-area-container">
      <button className="icon-account-container">
        <FaUserAlt className="icon-account" />
      </button>
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
