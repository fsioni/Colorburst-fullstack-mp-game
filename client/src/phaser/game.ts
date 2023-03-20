import "phaser";
import { config } from "./utils/config";

const phaserGame = new Phaser.Game(config);

(window as any).phaserGame = phaserGame;

export default phaserGame;
