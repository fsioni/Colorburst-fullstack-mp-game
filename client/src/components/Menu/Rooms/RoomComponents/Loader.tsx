import React from "react";
import "./Loader.css";
import { FC } from "react";

import loader from "../../../../data/loader.gif";

const Loader: FC = () => {
  return (
    <div className="loader-container">
      <img src={loader} alt="loading" />
    </div>
  );
};

export default Loader;
