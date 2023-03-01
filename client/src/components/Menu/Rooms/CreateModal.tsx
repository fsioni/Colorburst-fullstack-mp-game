import React from "react";
import "./CreateModal.css";

const CreateModal = () => {
  return (
    <div className="create-container">
      <h2 className="title">Create your Game 🏗️</h2>
      <form className="creat-form">
        <div className="name-room-container">
          <input
            className="name-input"
            id="roomName"
            type="text"
            placeholder="Room name"
          />
          <input
            type="number"
            id="nbMaxPlayers"
            name="tentacles"
            min="10"
            max="100"
          />
          <input
            className="submit-input"
            id="submit"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateModal;
