import "phaser";
import Config from "./config";

import { LoginScene } from "./scenes/LoginScene";

const config: Phaser.Types.Core.GameConfig = {
    title: "Solaxia World",
    width: Config.width,
    height: Config.height,
    parent: "game",
    scene: [ LoginScene ],
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    fps: {
        target: 60,
        min: 60,
        forceSetTimeOut: true
    }
};

export class SolaxiaWorldGame extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
};

window.onload = () => {
    const game = new SolaxiaWorldGame(config);
};
