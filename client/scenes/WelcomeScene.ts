import "phaser";
import Config from "../config";

export class WelcomeScene extends Phaser.Scene {

    constructor() {
        super("welcome");
    }

    preload() {
        this.load.image("sky", "assets/images/sky.png");
        this.load.image("sky2", "assets/images/sky2.png");
        this.load.image("clouds", "assets/images/clouds.png");
        this.load.image("trees", "assets/images/trees.png");
    }

    create() {
        const sky = this.add.image(0, 0, "sky").setOrigin(0);
        const sky2 = this.add.image(0, 0, "sky2").setOrigin(0);
        const clouds = this.add.image(0, 0, "clouds").setOrigin(0);
        const trees = this.add.image(0, 0, "trees").setOrigin(0);

        this.add.text(Config.width / 2, Config.height / 2 - 100, "SOLAXIA WORLD", { 
            fontFamily: "'VCR OSD Mono', Courier, monospace",
            fontSize: "64px",
            boundsAlignH: "center",
            color: "black"
        }).setOrigin(0.5);
    }
};
