import React, { FC } from "react";
import "./ReloadButton.css";
import { TbRefresh } from "react-icons/tb";

interface Props {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReloadButton: FC<Props> = ({ setLoading }) => {
  return (
    <div className="reaload-button-container">
      <button className="reload-button" onClick={() => setLoading(true)}>
        <TbRefresh className="reload-icon" />
      </button>
    </div>
  );
};

export default ReloadButton;
