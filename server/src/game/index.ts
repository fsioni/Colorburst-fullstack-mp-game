import Board from "./board";
import Player from "./player";

import Settings from "./settings";
import { Server, Socket } from "socket.io";
import Cell from "./cell";
import { playerPosition } from "./interfaces";

const skinsCount = 5;

export default class Game {
  socketServer: Server;
  gameSettings: Settings;
  gameBoard: Board;
  players: Player[] = [];
  isJoinable: boolean;
  gameID: string;
  nextSkin = 0;
  constructor(socketServer: Server, settings: Settings) {
    this.socketServer = socketServer;
    this.gameSettings = settings;
    this.gameBoard = new Board(this.boardSize);
    this.isJoinable = true;
    this.gameID = Math.random().toString(36).substring(7);
    setInterval(() => {
      this.movePlayers();
    }, 500);
  }

  get boardSize(): number {
    return this.gameSettings.boardSize;
  }

  get boardCells(): Cell[][] {
    return this.gameBoard.boardCells;
  }

  async join(playerSocket: Socket): Promise<void> {
    if (!this.isJoinable)
      return this.log(`Player tried to join the game: ${playerSocket.id}`);
    this.log(`New player joined the game: ${playerSocket.id}`);

    // on fait rejoindre la room socket io
    playerSocket.join(this.gameID);

    // Création du joueur
    const player = new Player(playerSocket);
    player.color = this.nextSkin;
    this.nextSkin = (this.nextSkin + 1) % skinsCount;
    this.players.push(player);

    // On met le detecteur d'évènement sur le joueur
    this.handlePlayersEvent(playerSocket);

    // On fait spawn le joueur
    this.spawnPlayer(player);

    // On envoie la liste des joueurs pour la couleur :)
    setTimeout(() => this.sendPlayersList(), 500);
  }

  private sendPlayersList(): void {
    console.log("sendPlayersList");
    this.socketServer.to(this.gameID).emit(
      "playersList",
      this.players.map((player) => ({
        id: player.id,
        color: player.color,
      }))
    );
  }

  spawnPlayer(player: Player): void {
    const spawnFromBordures = 5;

    player.isAlive = true;
    player.position = {
      x: Math.max(
        Math.floor(Math.random() * this.boardSize) - spawnFromBordures,
        spawnFromBordures
      ),
      y: Math.max(
        Math.floor(Math.random() * this.boardSize) - spawnFromBordures,
        spawnFromBordures
      ),
    };

    // On occupe les case en 5*5 autour du joueur 2 + 1 + 2
    this.gameBoard.occupeCellsSpawn(player.position, player.id);

    this.sendGameData();
  }

  private get playersPositions(): playerPosition[] {
    return this.alivePlayers.map((player) => ({
      playerID: player.id,
      ...player.position,
      direction: player.direction,
    }));
  }

  private get alivePlayers(): Player[] {
    return this.players.filter((player) => player.isAlive);
  }

  log(...data: any[]): void {
    console.log(`[Game ${this.gameID}]`, ...data);
  }

  private handlePlayersEvent(player: Socket): void {
    // Quand le joueur se déconnecte
    player.on("disconnect", () => {
      this.log(`Player disconnected: ${player.id}`);
      const playerToDelete = this.players.find(
        (p) => p.id === player.id
      ) as Player;
      this.players = this.players.filter((p) => p.id !== player.id);
      this.killPlayer(playerToDelete);
    });

    // Quand le joueur change de direction
    player.on("directionChange", (direction: number) => {
      const playerObject = this.players.find((p) => p.id === player.id);

      if (!playerObject) return;
      playerObject.ChangeDirection(direction);
      this.sendGameData();
    });
  }

  private sendPlayersPositions(): void {
    this.alivePlayers.forEach((player) => {
      player.socket.emit("playersPositions", this.playersPositions);
    });
  }

  private sendMapToPlayers(): void {
    this.alivePlayers.forEach((player) => {
      player.socket.emit("map", this.boardCells);
    });
  }

  private sendGameData(): void {
    this.sendPlayersPositions();
    this.sendMapToPlayers();
  }

  private killPlayer(player: Player, killer: Player | null = null): void {
    player.socket.emit("gameOver");
    player.isAlive = false;
    this.gameBoard.freeCells(player.id);
    this.spawnPlayer(player);

    if (killer) {
      // add score to killer
    }
  }

  private movePlayers(): void {
    this.alivePlayers.forEach((player) => {
      player.Move();

      // Check if player is out of bounds
      if (this.gameBoard.isInBoard(player)) {
        const cell = this.gameBoard.getCell(player.position);
        if (!cell) return;
        if (cell.trailsBy && cell.trailsBy !== player.id) {
          const playerToKill = this.players.find((p) => p.id === cell.trailsBy);
          if (playerToKill) this.killPlayer(playerToKill, player);
        }

        // Check if player is on his own trail
        if (cell.trailsBy && cell.trailsBy === player.id)
          this.killPlayer(player);

        // Check if player is on his own territory
        if (cell.territoryOccupiedBy !== player.id)
          this.gameBoard.setTrail(player);
      } else this.killPlayer(player);
    });

    // Emit message to informe client game was updated
    this.socketServer.to(this.gameID).emit("gameUpdated");
  }
}
