import React, { FC } from "react";
import "./ReloadButton.css";
import { TbRefresh } from "react-icons/tb";
import Loader from "./Loader";

interface Props {
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReloadButton: FC<Props> = ({ isLoading, setLoading }) => {
  const handleButtonClick = () => {
    setLoading(true);
  };

  return (
    <div className="reaload-button-container">
      {isLoading ? (
        <Loader />
      ) : (
        <button className="reload-button" onClick={() => handleButtonClick()}>
          <TbRefresh className="reload-icon" />
        </button>
      )}
    </div>
  );
};

export default ReloadButton;
