import React, { FC } from "react";
import "./MapSize.css";

interface Props {
  _bordSize: number;
  setBordSize: React.Dispatch<React.SetStateAction<number>>;
}

const MapSize: FC<Props> = ({ _bordSize, setBordSize }) => {
  return (
    <div className="mapSize-container">
      <p className="mapSize-title">Map Size :</p>
      <div className="selectdiv">
        <label>
          <select className="select-input">
            <option>Tiny </option>
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
