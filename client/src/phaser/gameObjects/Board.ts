import { Socket } from "socket.io";
import { AlignGrid } from "../utils/AlignGrid";
import Cell from "./Cell";
import { Buffer } from "buffer";

export default class Board {
  scene: Phaser.Scene;
  size: { x: number; y: number };
  cells: Cell[][] = [];
  aGrid: AlignGrid;
  socket: Socket;

  constructor(scene: Phaser.Scene, _x: number, _y: number, _socket: Socket) {
    console.log("Board.constructor()");
    this.scene = scene;
    this.size = { x: _x, y: _y };
    this.cells = [];
    this.aGrid = new AlignGrid({
      scene: this.scene,
      cols: this.size.x,
      rows: this.size.y,
    });

    for (let i = 0; i < this.size.x; i++) {
      this.cells[i] = [];
      for (let j = 0; j < this.size.y; j++) {
        this.cells[i][j] = new Cell(scene, this.aGrid, i, j);
      }
    }
    this.socket = _socket;
    this.handleSocketEvents();
  }

  handleSocketEvents() {
    this.socket.on("map", (...data: any) => {
      const messageData = JSON.stringify(data);

      const messageSize = Buffer.byteLength(messageData);
      const messageSizeInMB = messageSize / Math.pow(10, 6);
      console.log(`Message size: ${messageSizeInMB.toFixed(2)} MB`);

      const map = data[0];
      console.log("map: " + map.length + "this.cells: " + this.cells.length);
      for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
          if (map[i][j].territoryOccupiedBy) {
            this.cells[i][j].setFrame(1);
          } else if (map[i][j].trailsBy) {
            this.cells[i][j].setFrame(2);
          } else {
            this.cells[i][j].setFrame(0);
          }
        }
      }
    });
  }
}
