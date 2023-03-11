import React from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";
import "./IsPrivate.css";

export const IsPrivate = () => {
  return (
    <div className="private-container">
      <p className="private-title">Private :</p>
      <div className="lock-button">
        <span>
          <FaLockOpen className="icon-unlock" />
        </span>
        <span>
          <FaLock className="icon-lock" />
        </span>
      </div>
    </div>
  );
};

export default IsPrivate;
