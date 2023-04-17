import React, { FC } from "react";
import "./RoomName.css";

interface Props {
  _roomName: string;
  setRoomName: React.Dispatch<React.SetStateAction<string>>;
}

export const RoomName: FC<Props> = ({ _roomName, setRoomName }) => {
  const handleChange = (event: any): any => {
    event.preventDefault();
    setRoomName(event.target.value);
  };

  return (
    <div className="name-container">
      <p className="name-title">Name :</p>
      <input
        className="name-input"
        id="roomName"
        type="text"
        placeholder="Room name"
        required
        minLength={3}
        maxLength={10}
        onChange={(e) => handleChange(e)}
      />
      <span className="requiredField">*</span>
    </div>
  );
};

export default RoomName;
