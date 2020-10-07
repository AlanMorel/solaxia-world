import "phaser";
import Config from "../config";

export class WelcomeScene extends Phaser.Scene {
    constructor() {
        super("welcome");
    }

    preload() {
        this.load.image("logo", "assets/phaser3-logo.png");
        this.load.glsl("stars", "assets/starfields.glsl.js");
    }

    create() {
        this.add.shader("RGB Shift Field", 0, 0, Config.width, Config.height).setOrigin(0);

        const logo = this.add.image(Config.width / 2, Config.height / 2 - 100, "logo");

        this.tweens.add({
            targets: logo,
            y: Config.height / 2 + 100,
            duration: 1000,
            ease: "Sine",
            yoyo: true,
            repeat: -1
        });
    }
};
