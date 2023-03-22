import PreloadScene from "./scenes/preload";
import { FirstGameScene } from "./scenes/placeholder";

// 1080p
export const DEFAULT_WIDTH = 1920;
export const DEFAULT_HEIGHT = 1080;
// Transparent background
export const config: Phaser.Types.Core.GameConfig = {
  transparent: true,
  scale: {
    parent: "phaser", // this has to match the div id in index.html
    fullscreenTarget: "mainDiv", // this has to be the wrapping element
    width: "100%",
    height: "100%",
    mode: Phaser.Scale.FIT, // we scale the game manually in resize()
    // autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  dom: {
    createContainer: false,
  },
  scene: [PreloadScene, FirstGameScene],
  pixelArt: true,
};
