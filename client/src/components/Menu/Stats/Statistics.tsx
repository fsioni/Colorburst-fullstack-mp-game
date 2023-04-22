/* eslint-disable react/react-in-jsx-scope */
import { FC, useState } from "react";
import "./Statistics.css";
import MonthStats from "./MonthStats";
import TodayStats from "./TodayStats";
import {
  DocumentData,
  Firestore,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore";
import app from "../../../Firebase";

const Statistics: FC = () => {
  const [isTodayStatsPanelOpen, setIsTodayStatsPanelOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="main-stat-container">
      <h2 className="menu-stat-title">🥇 Hall of Fame 🥇</h2>
      <div className="panels">
        <div className="today-stats">
          <button
            className={`today-stats-btn ${
              isTodayStatsPanelOpen ? "active" : ""
            }`}
            onClick={() => setIsTodayStatsPanelOpen(true)}
          >
            Today
          </button>
        </div>
        <div className="month-stats">
          <button
            className={`month-stats-btn ${
              isTodayStatsPanelOpen ? "" : "active"
            }`}
            onClick={() => setIsTodayStatsPanelOpen(false)}
          >
            This month
          </button>
        </div>
      </div>
      {isTodayStatsPanelOpen ? (
        <TodayStats setIsLoading={setIsLoading} />
      ) : (
        <MonthStats setIsLoading={setIsLoading} />
      )}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default Statistics;

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedMonth = month;
  const formattedDay = day < 10 ? `${day}` : day;
  return `${year}-${formattedMonth}-${formattedDay}`;
};

const getPlayerUsername = async (db: Firestore, playerId: string) => {
  // Get the user's username from users collection
  const userRef = doc(db, "users", playerId);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists() && userDoc.data()?.displayName) {
    return userDoc.data()?.displayName;
  }
  return "Unknown";
};

const formatStatsFromDocData = async (db: Firestore, stats: DocumentData) => {
  console.log(stats);

  const playerList = document.createElement("ul");

  for (const playerId in stats) {
    const playerStats = stats[playerId];

    const listItem = document.createElement("li");
    const playerName = await getPlayerUsername(db, playerId);
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

const formatStatsFromTopPlayers = async (
  db: Firestore,
  stats: [string, any][]
) => {
  console.log(stats);

  const playerList = document.createElement("ul");

  for (const [playerId, playerStats] of stats) {
    const listItem = document.createElement("li");
    const playerName = await getPlayerUsername(db, playerId);
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
  const db = getFirestore(app);
  const todayRef = doc(db, "stats", formatDate(new Date()));
  const todayDoc = await getDoc(todayRef);
  if (todayDoc.exists()) {
    formatStatsFromDocData(db, todayDoc.data());
  } else {
    const noStats = document.createElement("p");
    noStats.innerHTML = "No stats for today!";
    document.getElementById("statsContainer")?.appendChild(noStats);
    console.log("No stats for today");
  }
};

const getDateOffsetFromToday = (offset: number) => {
  const date = new Date();
  date.setDate(date.getDate() - offset);
  return date;
};

const isDateInCurrentMonth = (date: Date) => {
  const today = new Date();
  return (
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const addStatsToData = (stats: DocumentData, data: DocumentData) => {
  for (const playerId in stats) {
    if (!data[playerId]) {
      console.log("Adding", playerId);
      data[playerId] = stats[playerId];
    } else {
      console.log("Adding to", playerId);
      data[playerId].blockTravelled += stats[playerId].blockTravelled;
      data[playerId].blocksCaptured += stats[playerId].blocksCaptured;
      data[playerId].deaths += stats[playerId].deaths;
      data[playerId].kills += stats[playerId].kills;
      if (stats[playerId].highestScore > data[playerId].highestScore) {
        data[playerId].highestScore = stats[playerId].highestScore;
      }
    }
  }
  return data;
};

const getTopPlayers = (data: DocumentData, amount: number) => {
  // sort by highest score and return top 5
  const sortedData = Object.entries(data).sort(
    (a, b) => b[1].highestScore - a[1].highestScore
  );
  console.log(sortedData);
  const topPlayers = sortedData.slice(0, amount);
  console.log(topPlayers);
  return topPlayers;
};

const getStatsThisMonth = async () => {
  const db = getFirestore(app);
  let data = {};
  for (let i = 0; i < 31; i++) {
    const date = getDateOffsetFromToday(i);
    if (!isDateInCurrentMonth(date)) {
      break;
    }
    const dateRef = doc(db, "stats", formatDate(date));
    const dateDoc = await getDoc(dateRef);
    if (dateDoc.exists()) {
      data = addStatsToData(dateDoc.data(), data);
    } else {
      console.log("No stats for", date);
    }
  }

  const finalData = getTopPlayers(data, 5);
  formatStatsFromTopPlayers(db, finalData);
};

export { getStatsToday, getStatsThisMonth };
