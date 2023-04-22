import React, { FC } from "react";
import { TfiLock } from "react-icons/tfi";
import "./Private.css";

interface Props {
  isPrivate: boolean;
}

const Private: FC<Props> = ({ isPrivate }) => {
  return (
    <div className="lock-container">
      {isPrivate ? (
        <span>
          <TfiLock />
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default Private;
