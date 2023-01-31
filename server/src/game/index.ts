import Board from "./Board";
import Player from "./player";

import Settings from "./Settings";
import { Server, Socket } from "socket.io";
import Cell from "./Cell";
import { playerPosition } from "./interfaces";

export default class Game {
  socketServer: Server;
  gameSettings: Settings;
  gameBoard: Board;
  players: Player[];
  isJoinable: boolean;
  gameID: string;

  constructor(socketServer: Server, settings: Settings) {
    this.socketServer = socketServer;
    this.gameSettings = settings;
    this.gameBoard = new Board(this.boardSize);
    this.players = [];
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

  join(playerSocket: Socket): void {
    if (!this.isJoinable)
      return this.log(`Player tried to join the game: ${playerSocket.id}`);
    this.log(`New player joined the game: ${playerSocket.id}`);

    // on fait rejoindre la room socket io
    playerSocket.join(this.gameID);

    // Création du joueur
    const player = new Player(playerSocket);
    this.players.push(player);

    // On met le detecteur d'évènement sur le joueur
    this.handlePlayersEvent(playerSocket);

    // On fait spawn le joueur
    this.spawnPlayer(player);
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

    this.sendPlayersPositions();
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
      this.sendPlayersPositions();
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

  private killPlayer(player: Player): void {
    this.gameBoard.freeCells(player.id);
  }

  private movePlayers(): void {
    this.alivePlayers.forEach((player) => {
      player.Move();

      // Check if player is out of bounds
      if (this.gameBoard.isInBoard(player)) {
        const cell = this.gameBoard.getCell(player.position);
        if (!cell) return;
        if (cell.trailsBy && cell.trailsBy !== player.id) {
          // TODO : LA MORT QUI TUE DU PELAV TUE
        }
        // Check if player is on his own trail
        if (cell.trailsBy && cell.trailsBy === player.id)
          player.isAlive = false;

        // Check if player is on his own territory
        if (cell.territoryOccupiedBy !== player.id)
          this.gameBoard.setTrail(player);
      } else player.isAlive = false;

      // Check if player is dead
      if (!player.isAlive) {
        player.socket.emit("gameOver");
        this.killPlayer(player);
        this.spawnPlayer(player);
      }

      // Make a trail
    });
    this.sendPlayersPositions();
    this.sendMapToPlayers();
    this.log(this.playersPositions);
  }
}
