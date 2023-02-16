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
      <div className="room-name">{roomName}</div>
      {isFull(nbPlayers, playersMax) ? (
        <div className="room-nbPlayers-Full">FULL</div>
      ) : (
        <div className="room-nbPlayers">{nbPlayers + "/" + playersMax}</div>
      )}
      <div className="room-private">{isPrivate ? <TfiLock /> : ""}</div>
    </div>
  );
};

export default singleRoom;
