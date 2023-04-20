import React, { FC } from "react";

interface Props {
  connectedPlayersCount: number;
  nbPlayersMax: number;
}

const isFull = (
  connectedPlayersCount: number,
  nbPlayersMax: number
): boolean => {
  return connectedPlayersCount - nbPlayersMax === 0;
};

const NbPlayers: FC<Props> = ({ connectedPlayersCount, nbPlayersMax }) => {
  return (
    <div className="players-number">
      {isFull(connectedPlayersCount, nbPlayersMax) ? (
        <div className="nbPlayers-Full">FULL</div>
      ) : (
        <div className="nbPlayers">
          {connectedPlayersCount + "/" + nbPlayersMax}
        </div>
      )}
    </div>
  );
};

export default NbPlayers;
