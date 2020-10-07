import "phaser";
import Config from "./config";

import { WelcomeScene } from "./scenes/WelcomeScene";

const config: Phaser.Types.Core.GameConfig = {
    title: "Solaxia World",
    width: Config.width,
    height: Config.height,
    parent: "game",
    scene: [ WelcomeScene ],
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
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
