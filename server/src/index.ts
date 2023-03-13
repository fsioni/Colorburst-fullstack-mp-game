import express, { Express } from "express";
import cors from "cors";
import * as http from "http";
import * as socketio from "socket.io";
import dotenv from "dotenv";
import { db, getUsers } from "./database/index";
import GameManager from "./GameManager";

const log = (...text: string[]) => console.log(`[Server] ${text.join(" ")}`);

dotenv.config({ path: "config_var.env" });
const port: number | undefined = process.env.PORT
  ? Number(process.env.PORT)
  : undefined;

const app: Express = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (_req, res) => {
  res.send({ uptime: process.uptime() });
});

const server: http.Server = http.createServer(app);
const io: socketio.Server = new socketio.Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

const gameManager = new GameManager(io);
gameManager.createGame({ boardSize: 80 });

io.on("connection", (socket) => {
  // Join the game
  console.log("New player connected");
  gameManager.getGame(gameManager.gamesList[0].gameID)?.join(socket);
});

server.listen(port, () => {
  log(`⚡️ Server is running at http://localhost:${port}`);
});

// getUsers().then((users) => {
//   console.log(users);
// });
