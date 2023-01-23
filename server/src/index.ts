import * as express from "express";
import cors from "cors";
import * as http from "http";
import * as socketio from "socket.io";
import dotenv from "dotenv";
dotenv.config({ path: "config_var.env" });
const port = process.env.PORT;

const app = express.default();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (_req, res) => {
  res.send({ uptime: process.uptime() });
});

app.get("/test", (_req, res) => {
  res.sendFile(__dirname + "/../../client/index.html");
});

const server = http.createServer(app);
const io = new socketio.Server(server);

io.on("connection", (...params) => {
  console.log("🚀 user connected");
});

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
