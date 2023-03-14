import React, { FC } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";
import "./IsPrivate.css";

interface Props {
  _isPrivate: boolean;
  setIsPrivate: React.Dispatch<React.SetStateAction<boolean>>;
}

export const IsPrivate: FC<Props> = ({ _isPrivate, setIsPrivate }) => {
  const changeValue = (): boolean => {
    let res: boolean = _isPrivate;
    if (res === false) {
      res = true;
    } else if (res === true) {
      res = false;
    }
    return res;
  };

  return (
    <div className="private-container">
      <p className="private-title">Private :</p>
      <div className="toggler">
        <input
          id="toggler-1"
          name="toggler-1"
          type="checkbox"
          onClick={(e) => setIsPrivate(changeValue())}
        />
        <label htmlFor="toggler-1">
          <span className="toggler-unlock">
            <FaLockOpen className="icon-unlock" />
          </span>
          <span className="toggler-lock">
            <FaLock className="icon-lock" />
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
