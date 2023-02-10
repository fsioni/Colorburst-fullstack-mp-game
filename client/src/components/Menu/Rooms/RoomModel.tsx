export default interface Room {
  roomId: number;
  roomName: string;
  nbPlayers: number;
  playersMax: number;
  isPrivate: boolean;
  password?: number;
}
