import React, { useEffect } from "react";
import { getStatsToday } from "./Statistics";

interface Props {
  setIsLoading: (isLoading: boolean) => void;
}

function TodayStats({ setIsLoading }: Props) {
  useEffect(() => {
    setIsLoading(true);
    getStatsToday().finally(() => setIsLoading(false));
  }, []);

  return (
    <div id="statsContainer">
      <h3>Today`&#39;`s Stats :</h3>
    </div>
  );
}

export default TodayStats;
