import { Server, Socket } from "socket.io";
import Settings from "../interfaces/Settings";
import Player from "./player";

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
  }

  // Ajouter le joueur à la partie
  addPlayer(socket: Socket) {
    console.log("[Game] A player Join =>", socket.id);
    this.players.push(new Player(socket.id));
    socket.join(this.gameID);
    handlePlayerEvents(socket, this);
    console.log(
      `[Game] There is curently ${this.players.length} players in the game.`
    );
  }
}

// Gérer tout les événements liés au joueur
function handlePlayerEvents(socket: Socket, game: Game) {
  socket.on("playerMove", (data: any) => {
    console.log("playerMove", data);
  });

  socket.on("disconnect", () => {
    console.log("[Game] A player leave =>", socket.id);
    game.players = game.players.filter((p) => p.name !== socket.id);
    console.log(
      `[Game] There is curently ${game.players.length} players in the game.`
    );
  });
}
