import Board from "./board";
import Player from "./player";
import { Server, Socket } from "socket.io";
import Cell from "./cell";
import { playerPosition, Settings, CreateGameSettings } from "./interfaces";
import { getUserPseudo, saveUserStats } from "../database";
import { Stats } from "../enums/Stats";
import { kill } from "process";

const skinsCount = 33;

export default class Game {
  socketServer: Server;
  gameSettings: Settings;
  gameBoard: Board;
  players: Player[] = [];
  isJoinable: boolean;
  gameID: string;
  nextSkin = 0;
  interval: NodeJS.Timeout;
  isOfficalGame = false;
  constructor(socketServer: Server, settings: CreateGameSettings) {
    this.socketServer = socketServer;
    this.gameSettings = {
      boardSize: settings.boardSize || 80,
      nbPlayersMax: settings.nbPlayersMax || 10,
      isPrivate: settings.isPrivate || false,
      invitationCode: settings.invitationCode || null,
      isOfficialGame: settings.isOfficialGame || false,
    };
    this.gameBoard = new Board(this.boardSize);
    this.isJoinable = true;
    this.gameID = Math.random().toString(36).substring(7);
    this.interval = setInterval(() => {
      this.movePlayers();
    }, 500);
  }

  get boardSize(): number {
    return this.gameSettings.boardSize;
  }

  get boardCells(): Cell[][] {
    return this.gameBoard.boardCells;
  }

  get nbPlayersMax(): number {
    return this.gameSettings.nbPlayersMax;
  }

  get isPrivate(): boolean {
    return this.gameSettings.isPrivate;
  }

  get invitationCode(): string | null {
    return this.gameSettings.invitationCode;
  }

  get alivePlayersCount(): number {
    return this.alivePlayers.length;
  }

  get connectedPlayersCount(): number {
    return this.players.length;
  }

  get isOfficialGame(): boolean {
    return this.gameSettings.isOfficialGame;
  }

  get leaderBoard(): { id: string; pseudo: string; score: number }[] {
    // Return total of territories for each player
    return this.players
      .map((player) => {
        return {
          id: player.id,
          pseudo: player.pseudo,
          score: player.scoreTotal,
        };
      })
      .sort((a, b) => b.score - a.score);
  }

  async join(playerSocket: Socket): Promise<void> {
    if (!this.isJoinable)
      return this.log(`Player tried to join the game: ${playerSocket.id}`);
    this.log(`New player joined the game: ${playerSocket.id}}`);

    // on fait rejoindre la room socket io
    playerSocket.join(this.gameID);

    // Création du joueur
    const player = new Player(playerSocket);
    if (playerSocket.handshake.query.playerSkin) {
      player.color = Number(playerSocket.handshake.query.playerSkin);
    } else {
      player.color = this.nextSkin;
      this.nextSkin = (this.nextSkin + 1) % skinsCount;
    }
    player.token = playerSocket.handshake.auth.token;
    getUserPseudo(playerSocket.handshake.auth.token)
      .then((pseudo) => {
        player.pseudo = pseudo || "Anonyme";
        this.log(`Player ${player.pseudo} joined the game`);
        this.socketServer.emit("playersList", this.playersList);
      })
      .catch((err) => {
        console.log(err);
      });
    //console.log(player.uid);
    this.nextSkin = (this.nextSkin + 1) % skinsCount;
    this.players.push(player);

    // On met le detecteur d'évènement sur le joueur
    this.handlePlayersEvent(playerSocket);
    this.onConnectEvent();
  }

  get playersList(): { id: string; pseudo: string; color: number }[] {
    return this.players.map((player) => ({
      id: player.id,
      pseudo: player.pseudo,
      color: player.color,
    }));
  }

  private sendPlayersList(): void {
    this.alivePlayers.forEach(() => {
      this.socketServer.emit("playersList", this.playersList);
    });
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

    this.sendPlayersList();
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

  private handlePlayersEvent(playerSocket: Socket): void {
    // Quand le joueur se déconnecte
    playerSocket.on("disconnect", () => {
      this.log(`Player disconnected: ${playerSocket.id}`);
      const playerToKill = this.players.find(
        (p) => p.id === playerSocket.id
      ) as Player;
      this.players = this.players.filter((p) => p.id !== playerSocket.id);
      this.killPlayer(playerToKill, null, true);
      this.onDisconnectEvent();
    });

    // Quand le joueur change de direction
    playerSocket.on("directionChange", (direction: number) => {
      const playerObject = this.players.find((p) => p.id === playerSocket.id);

      if (!playerObject) return;
      playerObject.ChangeDirection(direction);
      this.sendGameData();
    });

    playerSocket.on("playerReady", () => {
      playerSocket.emit("gameSettings", {
        boardSize: this.boardSize,
      });
      const player = this.players.find((p) => p.id === playerSocket.id);
      if (!player) return;
      this.spawnPlayer(player);
    });
  }

  private sendPlayersPositions(): void {
    this.alivePlayers.forEach((player) => {
      player.socket.emit("playersPositions", this.playersPositions);
    });
  }

  private sendMapToPlayers(): void {
    // Translate boardCells to a smaller array
    const map = this.boardCells.map((row) =>
      row.map((cell) => {
        if (cell.trailsBy && cell.territoryOccupiedBy)
          return [cell.territoryOccupiedBy, cell.trailsBy];
        if (cell.trailsBy) return [null, cell.trailsBy];
        if (cell.territoryOccupiedBy) return [cell.territoryOccupiedBy];
        return null;
      })
    );
    this.alivePlayers.forEach((player) => {
      player.socket.emit("map", map);
    });
    this.sendLeaderboard();
  }

  private sendLeaderboard(): void {
    this.alivePlayers.forEach((player) => {
      player.socket.emit("leaderBoard", this.leaderBoard);
    });
  }

  private sendGameData(): void {
    this.sendPlayersPositions();
    this.sendMapToPlayers();
  }

  private killPlayer(
    player: Player,
    killer: Player | null = null,
    disconnected = false
  ): void {
    player.gameStats.Add(Stats.KILLED, 1);
    player.socket.emit("gameOver");
    player.isAlive = false;
    player.outOfHisTerritory = false;
    this.gameBoard.freeCells(player.id);

    if (!disconnected) this.spawnPlayer(player);

    if (killer && killer.id !== player.id) {
      const getKilledScoreRatio = 0.1;
      killer.score += player.scoreTotal * getKilledScoreRatio;
      killer.gameStats.Add(Stats.KILL, 1);
      killer.socket.emit("kill");
    }
    this.saveStats();
  }

  private movePlayers(): void {
    this.alivePlayers.forEach((player) => {
      player.Move();

      // Check if player is out of bounds
      if (!this.gameBoard.isInBoard(player)) {
        this.killPlayer(player);
        return;
      }

      const cell = this.gameBoard.getCell(player.position);
      if (!cell) return;

      // Si il marche sur la queue d'un autre joueur
      if (cell.trailsBy !== player.id) {
        const toKill = this.players.find((p) => p.id === cell.trailsBy);
        if (toKill) this.killPlayer(toKill, player);
      }

      // Si il se marche sur lui même
      if (cell.trailsBy === player.id) {
        this.killPlayer(player, player);
      }

      // Check if player is on his own territory
      if (cell.territoryOccupiedBy !== player.id) {
        this.gameBoard.setTrail(player);
        player.outOfHisTerritory = true;
      }
      // Si le joueur reviens dans sa zone
      else if (player.outOfHisTerritory) {
        // On occupe les case dans la zone crée
        this.gameBoard.occupeCells(player);
        // clearInterval(this.interval);
        player.outOfHisTerritory = false;
        this.sendGameData();
      }
    });

    // Emit message to informe client game was updated
    this.socketServer.to(this.gameID).emit("gameUpdated");
  }

  private getDocumentName(): string {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  saveStats(): void {
    const docName = this.getDocumentName();
    this.players.forEach((player) => {
      // Save stats
      player.gameStats.Add(Stats.BLOCK_CAPTURED, 23);
      player.gameStats.Add(Stats.BLOCK_TRAVELLED, 43);
      saveUserStats(player.token, player.pseudo, player.gameStats, docName);
    });
  }

  private onDisconnectEvent = (): void => {};
  set onDisconnect(callback: () => void) {
    this.onDisconnectEvent = callback;
  }

  private onConnectEvent = (): void => {};
  set onConnect(callback: () => void) {
    this.onConnectEvent = callback;
  }
}
