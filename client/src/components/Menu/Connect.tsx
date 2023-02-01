/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, FC } from "react";
import { FaUserAlt } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
import "./HeadMenu.css";

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
    <div className="menu-connexion-area">
      <button
        className="menu-connexion-button"
        onClick={() => setIsLoged(getRandomInt(100))}
      >
        Se connecter
      </button>
    </div>
  ) : (
    <div className="menu-connexion-area">
      <span className="icon">
        <FaUserAlt />
      </span>
      <span className="icon" onClick={() => setIsLoged(-1)}>
        <RxExit />
      </span>
    </div>
  );
};

export default Connect;
