import { AlignGrid } from "./../utils/AlignGrid";
export default class Cell extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, grid: AlignGrid, i: number, j: number) {
    super(scene, 0, 0, "playerHeads");
    scene.add.existing(this);
    this.setFrame(Phaser.Math.Between(2, 32));
    grid.placeAt(i, j, this);

    setInterval(() => {
      this.changeSprite();
    }, 1000);
  }

  changeSprite = () => {
    this.setFrame(Phaser.Math.Between(2, 32));
  };
}
