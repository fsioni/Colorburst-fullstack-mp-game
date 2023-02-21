import { Socket } from "socket.io";
import Player from "./player";

export default class Game {
  players: Player[];
  socket: any;
  constructor(socket: Socket) {
    this.socket = socket;
    this.players = [];
  }
}
