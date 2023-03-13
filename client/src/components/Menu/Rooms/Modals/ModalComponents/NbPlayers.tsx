import React, { FC } from "react";
import "./NbPlayers.css";

interface Props {
  nbPlayers: number;
  setNbPlayers: React.Dispatch<React.SetStateAction<number>>;
}

export const NbPlayers: FC<Props> = ({ nbPlayers, setNbPlayers }) => {
  const handleChange = (event: any): any => {
    event.preventDefault;
    if (nbPlayers > 100) {
      alert("Max players is 100");
    }
    if (nbPlayers < 0) {
      alert("Number of players can't be negative");
    }
    setNbPlayers(event.target.value);
  };

  return (
    <div className="nb-players-container">
      <p className="nb-players-tile">Players :</p>
      <input
        className="number-players-input"
        type="number"
        id="nbMaxPlayers"
        name="tentacles"
        min="10"
        max="100"
        step="10"
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default NbPlayers;
