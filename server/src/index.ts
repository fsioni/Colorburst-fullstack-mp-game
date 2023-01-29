import express, { Express } from "express";
import cors from "cors";
import * as http from "http";
import * as socketio from "socket.io";
import dotenv from "dotenv";
import Game from "./game";
import Settings from "./interfaces/Settings";

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

const settings: Settings = {
  boardSize: 100,
  nbPlayersMax: 0,
  isPrivate: false,
  invitationCode: null,
};
const game = new Game(io, settings);

io.on("connection", (socket) => {
  // Get session id
  game.addPlayer(socket);
  log("📈 New client connected", socket.id);
  socket.on("disconnect", () => {
    log("📉 Client disconnected", socket.id);
  });
});

server.listen(port, () => {
  log(`⚡️ Server is running at http://localhost:${port}`);
});
