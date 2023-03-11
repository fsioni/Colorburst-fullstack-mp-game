import React from "react";
import "./RoomName.css";

export const RoomName = () => {
  return (
    <div className="name-container">
      <p className="name-title">Name :</p>
      <input
        className="name-input"
        id="roomName"
        type="text"
        placeholder="Room name"
      />
    </div>
  );
};

export default RoomName;
