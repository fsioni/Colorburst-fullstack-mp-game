import FirstGameScene from "../scenes/GameScene";

export default class PlayerNameText extends Phaser.GameObjects.Text {
  offsetY = 160;

  constructor(scene: FirstGameScene, x: number, y: number, pseudo: string) {
    super(scene, x, y, pseudo, {
      fontFamily: "Arial",
      fontSize: "120px",
      color: "#ffffff",
      align: "center",
    });

    this.setOrigin(0.5, 0.5);
    this.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
    this.setShadow(6, 6, "#333333", 6, true, true);
    this.setAlpha(0.8);

    scene.add.existing(this);

    this.setDepth(100);
  }

  updatePosition(x: number, y: number) {
    this.x = x;
    this.y = y - this.offsetY;
  }
}
