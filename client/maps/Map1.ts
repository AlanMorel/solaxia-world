import * as PIXI from "pixi.js-legacy";
import Map from "./Map";
import Config from "../config";
import Tiler from "../utility/Tiler";
import Monster from "../monsters/Monster";

export default class Map1 extends Map {

    constructor(scene: PIXI.Container) {
        super(scene, 1);
    }

    public async background(): Promise<void> {
        new Tiler(this.scene, "assets/images/tiles/soil.png", this.width, 2, (texture: PIXI.Texture) => {
            return this.height - texture.height * 2;
        });
        new Tiler(this.scene, "assets/images/tiles/top-soil.png", this.width, 1, (texture: PIXI.Texture) => {
            return this.height - texture.height - 64;
        });

        new Tiler(this.scene, "assets/images/tiles/sky.png", this.width, 1, () => 0);

        for (let i = 0; i < 1; i++) {
            const monster = new Monster(this.scene, this, "mushroom");
            await monster.initMonster();
            this.addMonster(monster);
        }
    }

    public foreground(): void {
        const line = new PIXI.Graphics();
        line.lineStyle(1, 0xff0000);
        line.moveTo(0, this.floor);
        line.lineTo(this.width, this.floor);

        this.scene.addChild(line);
    }
}
