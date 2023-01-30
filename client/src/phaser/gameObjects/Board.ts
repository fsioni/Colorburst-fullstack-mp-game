import { AlignGrid } from "./../utils/AlignGrid";
import Cell from "./Cell";

export default class Board {
  scene: Phaser.Scene;
  size: { x: number; y: number };
  cells: Cell[][] = [];
  aGrid: AlignGrid;

  constructor(scene: Phaser.Scene, _x: number, _y: number) {
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
        this.cells[i][j] = new Cell(this.scene, this.aGrid, i, j);
      }
    }
  }
}
