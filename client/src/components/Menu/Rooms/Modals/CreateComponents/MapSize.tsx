import React, { FC } from "react";
import "./MapSize.css";

interface Props {
  _boardSize: number;
  setBoardSize: React.Dispatch<React.SetStateAction<number>>;
}

const MapSize: FC<Props> = ({ _boardSize, setBoardSize }) => {
  const handleChange = (event: any): any => {
    switch (event.target.value) {
      case "Tiny":
        setBoardSize(10);
        break;
      case "Small":
        setBoardSize(25);
        break;
      case "Large":
        setBoardSize(100);
        break;
      default:
        setBoardSize(50);
        break;
    }
  };

  return (
    <div className="mapSize-container">
      <div className="feild-container">
        <p className="mapSize-title">Map Size :</p>
        <p className="mapSize-value">
          {_boardSize} x {_boardSize}
        </p>
      </div>
      <div className="selectdiv">
        <label>
          <select className="select-input" onChange={(e) => handleChange(e)}>
            <option>Tiny</option>
            <option>Small</option>
            <option selected>Medium</option>
            <option>Large</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default MapSize;
