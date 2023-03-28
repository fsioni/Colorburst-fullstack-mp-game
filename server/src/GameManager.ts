import { Server } from "socket.io";
import Game from "./game";
import { CreateGameSettings } from "./game/interfaces";
class GameManager {
  private games: Game[] = [];
  socketServeur: Server;
  constructor(socketServeur: Server) {
    this.socketServeur = socketServeur;
  }

  createGame(settings: CreateGameSettings): Game {
    const game = new Game(this.socketServeur, settings);
    this.games.push(game);
    return game;
  }

  getGame(gameID: string): Game | undefined {
    return this.games.find((game) => game.gameID === gameID);
  }

  deleteGame(gameID: string): void {
    this.games = this.games.filter((game) => game.gameID !== gameID);
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
