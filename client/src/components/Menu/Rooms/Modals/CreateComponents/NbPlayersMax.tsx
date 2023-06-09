import React, { FC } from "react";
import "./NbPlayersMax.css";

interface Props {
  _nbPlayers: number;
  setNbPlayers: React.Dispatch<React.SetStateAction<number>>;
}

export const NbPlayers: FC<Props> = ({ _nbPlayers, setNbPlayers }) => {
  const handleChange = (event: any): any => {
    event.preventDefault;
    setNbPlayers(event.target.value);
  };

  return (
    <div className="nb-players-container">
      <p className="nb-players-tile">Players :</p>
      <input
        className="number-players-input"
        type="number"
        value={_nbPlayers}
        id="nbMaxPlayers"
        name="tentacles"
        min="2"
        max="100"
        required
        onChange={(e) => handleChange(e)}
      />
      <span className="requiredField">*</span>
    </div>
  );
};

export default NbPlayers;
