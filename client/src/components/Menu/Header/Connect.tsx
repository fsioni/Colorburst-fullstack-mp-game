/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, FC } from "react";
import { FaUserAlt } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
import "./Connect.css";

const getRandomInt = (maximum: number): number => {
  return Math.floor(Math.random() * maximum);
};

const Connect: FC = (): JSX.Element => {
  const savedLoging: string | null = localStorage.getItem("isLoged");
  const [isLoged, setIsLoged] = useState<number>(
    savedLoging ? JSON.parse(savedLoging) : -1
  );

  useEffect(() => {
    // met à jour la localStorage pour enregister la connexion
    localStorage.setItem("isLoged", JSON.stringify(isLoged));
  }, [isLoged]);

  return isLoged === -1 ? (
    <div className="connexion-area-container">
      <button
        className="connexion-button"
        // A changer renvoie l'id du joueur connecté
        onClick={() => setIsLoged(getRandomInt(100))}
      >
        Login
      </button>
    </div>
  ) : (
    <div className="connexion-area-container">
      <span className="icon-acount-container">
        <FaUserAlt className="icon-acount" />
      </span>
      <span className="icon-logout-container" onClick={() => setIsLoged(-1)}>
        <RxExit className="icon-logout" />
      </span>
    </div>
  );
};

export default Connect;
