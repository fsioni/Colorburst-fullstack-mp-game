import "phaser";
import { config } from "./config";

const phaserGame = new Phaser.Game(config);

(window as any).phaserGame = phaserGame;

export default phaserGame;
