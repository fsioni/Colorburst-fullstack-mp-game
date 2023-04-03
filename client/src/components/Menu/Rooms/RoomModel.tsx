export default interface Room {
  gameID: string;
  gameName: string;
  connectedPlayersCount: number;
  nbPlayersMax: number;
  isPrivate: boolean;
}
