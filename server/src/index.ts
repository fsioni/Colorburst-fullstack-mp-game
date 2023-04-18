import express, { Express } from "express";
import cors from "cors";
import * as http from "http";
import * as socketio from "socket.io";
import dotenv from "dotenv";
import Game from "./game";
// Import the game route file
import gameRouter from "./api/game";
import { db, getUsers } from "./database/index";
import GameManager from "./GameManager";

const log = (...text: string[]) => console.log(`[Server] ${text.join(" ")}`);

dotenv.config({ path: "config_var.env" });
const port: number | undefined = process.env.PORT
  ? Number(process.env.PORT)
  : undefined;

const app: Express = express();

// Server io creation
const server: http.Server = http.createServer(app);
const io: socketio.Server = new socketio.Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});
// Creation of the instance GameManager
export const gameManager = new GameManager(io);

io.on("connection", (socket) => {
  // Join the game
  console.log("New player connected");

  // check if the player is already in a game
  const gameID = (socket.handshake.query.gameID as string) || "default";
  const password = (socket.handshake.query.password as string) || undefined;

  if (!gameID || gameID == "default") {
    gameManager.defaultGame.join(socket, password);
  } else {
    const game = gameManager.getGame(gameID);
    if (game) {
      console.log("Game found, joining game");
      game.join(socket);
    } else {
      console.log("Game not found, joining default game");
      gameManager.defaultGame.join(socket);
    }
  }
});

server.listen(port, () => {
  log(`⚡️ Server is running at http://localhost:${port}`);
});

app.use(cors({ origin: "*" }));
app.use(express.json());
// Middleware to extract data from POST
app.use(
  express.urlencoded({
    extended: true,
  })
);
// Alowed fetch and parse
app.use(express.json());
// Routes for rooms backend
app.use("/rooms", gameRouter);

app.get("/", (_req, res) => {
  res.send({ uptime: process.uptime() });
});
