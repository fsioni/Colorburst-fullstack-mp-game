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
  invitationCode?: string | null;
  isOfficialGame?: boolean;
}

export interface Settings {
  boardSize: number;
  nbPlayersMax: number;
  isPrivate: boolean;
  invitationCode: string | null;
  isOfficialGame: boolean;
}
