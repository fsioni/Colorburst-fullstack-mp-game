import express, { Express } from "express";
import cors from "cors";
import * as http from "http";
import * as socketio from "socket.io";
import dotenv from "dotenv";

dotenv.config({ path: "config_var.env" });
const port = process.env.PORT;

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

io.on("connection", (socket) => {
  // Get session id
  console.log("📈 [server] New client connected", socket.id);
  socket.on("disconnect", () => {
    console.log("📉 [server] Client disconnected", socket.id);
  });
});

server.listen(port, () => {
  console.log(`⚡️ [server]: Server is running at http://localhost:${port}`);
});
