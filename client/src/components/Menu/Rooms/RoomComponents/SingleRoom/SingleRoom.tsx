import React, { FC } from "react";
import "./SingleRoom.css";
import { TfiLock } from "react-icons/tfi";

interface Props {
  gameID: string;
  gameName: string;
  connectedPlayersCount: number;
  nbPlayersMax: number;
  isPrivate: boolean;
}

const isFull = (
  connectedPlayersCount: number,
  nbPlayersMax: number
): boolean => {
  return connectedPlayersCount - nbPlayersMax === 0;
};

const singleRoom: FC<Props> = ({
  gameID,
  gameName,
  connectedPlayersCount,
  nbPlayersMax,
  isPrivate,
}) => {
  return (
    <div className="single-room-container">
      <div className="room-name">
        {isPrivate ? (
          <span className="lock-icon">
            <TfiLock />
          </span>
        ) : (
          ""
        )}
        {gameName}
      </div>
      <div className="players-number">
        {isFull(connectedPlayersCount, nbPlayersMax) ? (
          <div className="nbPlayers-Full">FULL</div>
        ) : (
          <div className="nbPlayers">
            {connectedPlayersCount + "/" + nbPlayersMax}
          </div>
        )}
      </div>
    </div>
  );
};

export default singleRoom;
