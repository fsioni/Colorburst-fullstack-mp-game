import { AlignGrid } from "../utils/AlignGrid";
export default class Cell extends Phaser.GameObjects.Sprite {
  occupedBy: string | null = null;
  constructor(scene: Phaser.Scene, grid: AlignGrid, i: number, j: number) {
    super(scene, 0, 0, "boardCells");
    scene.add.existing(this);
    this.setScale(14);
    this.setFrame(0, true);
    grid.placeAt(i, j, this);
  }
}
