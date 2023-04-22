import React, { useEffect } from "react";
import { getStatsThisMonth } from "./Statistics";
import "./Statistics.css";

interface Props {
  setIsLoading: (isLoading: boolean) => void;
}

function MonthStats({ setIsLoading }: Props) {
  useEffect(() => {
    setIsLoading(true);
    getStatsThisMonth().finally(() => setIsLoading(false));
  }, []);

  return (
    <div
      id="statsContainer"
      style={{ maxHeight: "300px", overflowY: "scroll" }}
    >
      <h3>This month&#39;s Stats :</h3>
    </div>
  );
}

export default MonthStats;
