import React from "react";
import "./NbPlayers.css";

export const NbPlayers = () => {
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
      />
    </div>
  );
};

export default NbPlayers;
