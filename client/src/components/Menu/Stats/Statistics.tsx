/* eslint-disable react/react-in-jsx-scope */
import { FC, useEffect } from "react";
import "./Statistics.css";
import app from "../../../Firebase";
import { DocumentData, doc, getDoc, getFirestore } from "firebase/firestore";

const Statistics: FC = () => {
  useEffect(() => {
    const db = getFirestore(app);

    const getTodayDateFormatted = () => {
      const date = new Date();
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    };

    const getPlayerUsername = async (playerId: string) => {
      // Get the user's username from users collection
      const userRef = doc(db, "users", playerId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists() && userDoc.data()?.displayName) {
        return userDoc.data()?.displayName;
      }
      return "Unknown";
    };

    const formatStats = async (stats: DocumentData) => {
      console.log(stats);

      const playerList = document.createElement("ul");

      for (const playerId in stats) {
        const playerStats = stats[playerId];

        const listItem = document.createElement("li");
        const playerName = await getPlayerUsername(playerId);
        listItem.innerHTML = `<strong>${playerName}:</strong>
        <ul>
          <li>Blocks parcourus: ${playerStats.blockTravelled}</li>
          <li>Blocks capturés: ${playerStats.blocksCaptured}</li>
          <li>Score le plus élevé: ${playerStats.highestScore || 0}</li>
          <li>Nombre de morts: ${playerStats.deaths}</li>
          <li>Nombre de kills: ${playerStats.kills}</li>
        </ul>`;
        playerList.appendChild(listItem);
      }
      document.getElementById("statsContainer")?.appendChild(playerList);
    };

    const getStatsToday = async () => {
      const todayRef = doc(db, "stats", getTodayDateFormatted());
      const todayDoc = await getDoc(todayRef);
      if (todayDoc.exists()) {
        console.log("Document data:", todayDoc.data());
        formatStats(todayDoc.data());
      } else {
        console.log("No stats for today!");
      }
    };

    getStatsToday();
  }, []);

  return (
    <div className="main-stat-container">
      <h2 className="menu-stat-title">🥇 Hall of Fame 🥇</h2>
      <div id="statsContainer">
        <h2>Les stats du jour</h2>
      </div>
    </div>
  );
};

export default Statistics;
