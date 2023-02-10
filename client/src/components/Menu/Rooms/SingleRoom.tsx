import React, { FC } from "react";
import "./SingleRoom.css";

interface Props {
  roomId: number;
  roomName: string;
  nbPlayers: number;
  playersMax: number;
  isPrivate: boolean;
  password: number | null | undefined;
}

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
      {roomName} /{nbPlayers} {}
    </div>
  );
};

export default singleRoom;
