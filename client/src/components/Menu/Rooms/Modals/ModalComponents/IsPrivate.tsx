import React from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";
import "./IsPrivate.css";

export const IsPrivate = () => {
  return (
    <div className="private-container">
      <p className="private-title">Private :</p>
      <div className="toggler">
        <input id="toggler-1" name="toggler-1" type="checkbox" value="1" />
        <label htmlFor="toggler-1">
          <span className="toggler-on">
            <FaLockOpen className="icon-lock" />
          </span>
          <span className="toggler-off">
            <FaLock className="icon-unlock" />
          </span>
        </label>
      </div>
    </div>
  );
};

/* Ancien bouton
<div className="lock-button">
  <span>
    <FaLockOpen className="icon-unlock" />
  </span>
  <span>
    <FaLock className="icon-lock" />
  </span>
</div>*/

export default IsPrivate;
