import React, { FC } from "react";
import "./SubmitAndReset.css";

export const SubmitAndReset: FC = () => {
  return (
    <div className="submit-container">
      <input
        className="submit-input"
        id="submit"
        type="submit"
        value="Submit"
      />
      <input className="reset-input" id="reset" type="reset" value="Reset" />
    </div>
  );
};

export default SubmitAndReset;
