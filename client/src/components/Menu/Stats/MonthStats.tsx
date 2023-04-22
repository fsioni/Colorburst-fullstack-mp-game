import React, { useEffect } from "react";
import { getStatsThisMonth } from "./Statistics";

interface Props {
  setIsLoading: (isLoading: boolean) => void;
}

function MonthStats({ setIsLoading }: Props) {
  useEffect(() => {
    setIsLoading(true);
    getStatsThisMonth().finally(() => setIsLoading(false));
  }, []);

  return (
    <div id="statsContainer">
      <h3>This month&#39;s Stats :</h3>
    </div>
  );
}

export default MonthStats;
