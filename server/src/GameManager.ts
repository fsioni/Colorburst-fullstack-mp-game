import { Server } from "socket.io";
import Game from "./game";
import { CreateGameSettings } from "./game/interfaces";
class GameManager {
  private games: Game[] = [];
  socketServeur: Server;
  deleteTimeOut: Map<string, NodeJS.Timeout> = new Map();
  constructor(socketServeur: Server) {
    this.socketServeur = socketServeur;
  }

  createGame(settings: CreateGameSettings): Game {
    const game = new Game(this.socketServeur, settings);
    this.games.push(game);

    game.onConnect = () => {
      console.log("onConnect");
      const timeout = this.deleteTimeOut.get(game.gameID);
      if (timeout) {
        clearTimeout(timeout);
        this.deleteTimeOut.delete(game.gameID);
        console.log(game.gameID, "Game secured");
      }
    };

    game.onDisconnect = () => {
      if (game.alivePlayersCount === 0) {
        const timeout = setTimeout(() => {
          this.deleteGame(game.gameID);
          console.log(game.gameID, "Game deleted");
          console.log("Games count:", this.games.length);
        }, 10000);
        this.deleteTimeOut.set(game.gameID, timeout);
      }
    };

    return game;
  }

  getGame(gameID: string): Game | undefined {
    return this.games.find((game) => game.gameID === gameID);
  }

  deleteGame(gameID: string): void {
    const game = this.getGame(gameID);
    if (!game) return;
    game.stop();
    this.games = this.games.filter((game) => game.gameID !== gameID);
  }

  // Récupérer la partie officielle / démarer une partie officielle
  get defaultGame() {
    const game = this.games.find((game) => game.isOfficialGame);
    if (game) {
      console.log("Official game found");
      return game;
    }
    console.log("No official game found, creating one");
    return this.createGame({
      isOfficialGame: true,
      roomId: Math.random().toString(36).substring(7),
      roomName: "Default game",
    });
  }

  get gamesList() {
    return this.games.map((game) => ({
      gameID: game.gameID,
      gameName: game.gameName,
      boardSize: game.boardSize,
      nbPlayersMax: game.nbPlayersMax,
      isPrivate: game.isPrivate,
      invitationCode: game.invitationCode,
      alivePlayersCount: game.alivePlayersCount,
      connectedPlayersCount: game.connectedPlayersCount,
    }));
  }
}

export default GameManager;
