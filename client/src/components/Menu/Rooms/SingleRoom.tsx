import React, { FC } from "react";
import "./SingleRoom.css";
import { TfiLock } from "react-icons/tfi";

interface Props {
  roomId: number;
  roomName: string;
  nbPlayers: number;
  playersMax: number;
  isPrivate: boolean;
  password: number | null | undefined;
}

const isFull = (nbPlayers: number, playersMax: number): boolean => {
  return nbPlayers - playersMax === 0;
};

const singleRoom: FC<Props> = ({
  roomId,
  roomName,
  nbPlayers,
  playersMax,
  isPrivate,
  password,
}) => {
  return (
    <div className="single-room-container">
      <div className="room-name">
        {roomName}
        {isPrivate ? (
          <span className="lock-icon">
            <TfiLock />
          </span>
        ) : (
          ""
        )}
      </div>
      <div className="players-number">
        {isFull(nbPlayers, playersMax) ? (
          <div className="nbPlayers-Full">FULL</div>
        ) : (
          <div className="nbPlayers">{nbPlayers + "/" + playersMax}</div>
        )}
      </div>
    </div>
  );
};

export default singleRoom;
