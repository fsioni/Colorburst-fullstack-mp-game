import Phaser from "phaser";
export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload() {
    console.log("PreloadScene: preload");
  }

  create() {
    //this.scene.start("FirstGameScene");
  }
}
