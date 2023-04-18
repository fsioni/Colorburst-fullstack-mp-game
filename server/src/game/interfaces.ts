export interface playerPosition {
  x: number;
  y: number;
  direction?: number;
  playerID?: string;
}

export interface CreateGameSettings {
  roomId?: string;
  roomName?: string;
  boardSize?: number;
  nbPlayersMax?: number;
  isPrivate?: boolean;
  isOfficialGame?: boolean;
  password?: string;
}

export interface Settings {
  boardSize: number;
  nbPlayersMax: number;
  isPrivate: boolean;
  isOfficialGame: boolean;
  password?: string;
}
