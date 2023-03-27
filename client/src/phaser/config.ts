import PreloadScene from "./scenes/preload";
import { FirstGameScene } from "./scenes/placeholder";

// 1080p
export const DEFAULT_WIDTH = 1920;
export const DEFAULT_HEIGHT = 1080;

export const config: Phaser.Types.Core.GameConfig = {
  backgroundColor: "#ffffff",
  scale: {
    parent: "phaser", // this has to match the div id in index.html
    fullscreenTarget: "mainDiv", // this has to be the wrapping element
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    mode: Phaser.Scale.FIT, // we scale the game manually in resize()
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      //480p
      width: 720,
      height: 480,
    },
  },
  dom: {
    createContainer: false,
  },
  scene: [PreloadScene, FirstGameScene],
  physics: {
    default: "arcade",
  },
};
