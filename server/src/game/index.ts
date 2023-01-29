import { Server, Socket } from "socket.io";
import Settings from "../interfaces/Settings";
import Player from "./player";

let log = (...text: string[]) => console.log(`[Game] ${text.join(" ")}`);

export default class Game {
  players: Player[];
  socket: any;
  settings: Settings;
  gameID: string;
  constructor(socket: Server, settings: Settings) {
    this.socket = socket;
    this.players = [];
    this.settings = settings;
    this.gameID = Math.random().toString(36).substring(7);
    log = (...text: string[]) =>
      console.log(`[Game:${this.gameID}] ${text.join(" ")}`);
  }

  // Ajouter le joueur à la partie
  addPlayer(socket: Socket) {
    log("A player Join =>", socket.id);
    this.players.push(new Player(socket.id));
    socket.join(this.gameID);
    handlePlayerEvents(socket, this);
    log(`There is curently ${this.players.length} players in the game.`);
  }
}

// Gérer tout les événements liés au joueur
function handlePlayerEvents(socket: Socket, game: Game) {
  socket.on("directionChange", (data: any) => {
    log(`${socket.id} => directionChange`, data);
  });

  socket.on("disconnect", () => {
    log("A player leave =>", socket.id);
    game.players = game.players.filter((p) => p.name !== socket.id);
    log(`There is curently ${game.players.length} players in the game.`);
  });
}
