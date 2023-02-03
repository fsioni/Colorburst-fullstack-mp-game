import { Socket } from "socket.io";
import { AlignGrid } from "../utils/AlignGrid";
import Cell from "./Cell";
import { FirstGameScene } from "../scenes/placeholder";

export default class Board {
  scene: FirstGameScene;
  size: { x: number; y: number };
  cells: Cell[][] = [];
  aGrid: AlignGrid;
  socket: Socket;

  constructor(scene: FirstGameScene, _x: number, _y: number, _socket: Socket) {
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

  setCell(x: number, y: number, frame: number) {
    this.cells[x][y].setFrame(frame);
  }

  handleSocketEvents() {
    this.socket.on(
      "map",
      (
        data: {
          territoryOccupiedBy: string | null;
          trailsBy: string | null;
        }[][]
      ) => {
        const map = data;
        let colors = this.scene.players.reduce((acc, p) => {
          acc[p.id] = p.color;
          return acc;
        }, {});
        colors = { ...colors, [this.socket.id]: this.scene.player?.color || 0 };
        for (let i = 0; i < map.length; i++) {
          for (let j = 0; j < map[i].length; j++) {
            const cell = map[i][j];
            if (cell.territoryOccupiedBy) {
              const color = colors[cell.territoryOccupiedBy] || 0;
              this.setCell(i, j, color + 1);
            } else if (cell.trailsBy) {
              const color = colors[cell.trailsBy] || 0;
              this.setCell(i, j, color + 2);
            } else {
              this.setCell(i, j, 0);
            }
          }
        }
      }
    );
  }
}
