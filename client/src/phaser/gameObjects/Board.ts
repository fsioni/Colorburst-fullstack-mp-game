import { Socket } from "socket.io";
import DrawMiniMap from "../utils/DrawMiniMap";
import { AlignGrid } from "../utils/AlignGrid";
import Cell from "./Cell";
import FirstGameScene from "../scenes/GameScene";
import { Buffer } from "buffer";
export default class Board {
  scene: FirstGameScene;
  size: { x: number; y: number };
  cells: Cell[][] = [];
  aGrid: AlignGrid;
  socket: Socket;

  constructor(scene: FirstGameScene, _x: number, _y: number, _socket: Socket) {
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

  setCell(x: number, y: number, frame: number) {
    if (x < 0 || y < 0 || x > this.size.x || y > this.size.y) return;
    this.cells[x][y].setFrame(frame);
  }

  get colorsList() {
    let colors = this.scene.players.reduce((acc, p) => {
      acc[p.id] = p.color;
      return acc;
    }, {} as { [key: string]: number }) as { [key: string]: number };
    colors = { ...colors, [this.socket.id]: this.scene.player?.color || 0 };
    return colors;
  }

  handleSocketEvents() {
    this.socket.on("map", (data: [[null | [string, string] | [string]]]) => {
      const packetSize = Buffer.byteLength(JSON.stringify(data));
      console.log(`[map] Packet size: ${packetSize} bytes`);
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          const cell = data[i][j];
          if (cell === null) {
            this.clearData(i, j);
            this.setCell(i, j, 0);
          } else if (cell.length === 1) {
            // Occuped cell
            const player = cell[0];
            this.setTerritoryOccupied(i, j, player);
          } else if (cell.length === 2) {
            // Trail cell
            const player = cell[1];
            this.setTrailsBy(i, j, player);
          }
        }
      }
      DrawMiniMap(this);
    });
  }

  clearData(i: number, j: number) {
    this.cells[i][j].occupedBy = null;
  }

  setTrailsBy(x: number, y: number, player: string) {
    const cell = this.cells[x][y];
    if (!cell) return;
    if (cell.occupedBy === player) return;
    const color = this.colorsList[player] || 0;
    this.setCell(x, y, color * 2 + 2);
  }

  setTerritoryOccupied(x: number, y: number, player: string) {
    this.cells[x][y].occupedBy = player;
    const color = this.colorsList[player] || 0;
    this.setCell(x, y, color * 2 + 1);
  }
}
