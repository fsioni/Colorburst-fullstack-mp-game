import React, { FC } from "react";
import "./NbPlayers.css";

interface Props {
  _nbPlayers: number;
  setNbPlayers: React.Dispatch<React.SetStateAction<number>>;
}

export const NbPlayers: FC<Props> = ({ _nbPlayers, setNbPlayers }) => {
  const handleChange = (event: any): any => {
    event.preventDefault;
    if (_nbPlayers > 100) {
      alert("Max players is 100");
    }
    if (_nbPlayers < 0) {
      alert("Number of players can't be negative");
    }
    setNbPlayers(event.target.value);
  };

  return (
    <div className="nb-players-container">
      <p className="nb-players-tile">Max players :</p>
      <input
        className="number-players-input"
        type="number"
        value={_nbPlayers}
        id="nbMaxPlayers"
        name="tentacles"
        min="10"
        max="100"
        step="10"
        required
        onChange={(e) => handleChange(e)}
      />
      <span className="requiredField">*</span>
    </div>
  );
};

export default NbPlayers;
