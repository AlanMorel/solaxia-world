import * as PIXI from "pixi.js-legacy";
import Map from "./Map";
import Config from "../config";
import Tiler from "../utility/Tiler";
import Monster from "../monsters/Monster";

export default class Map1 extends Map {

    constructor(scene: PIXI.Container) {
        super(scene, 1, Config.width * 3, Config.height, Config.height - 145);
    }

    public background(): void {
        new Tiler(this.scene, "assets/images/soil.png", this.width, 2, (texture: PIXI.Texture) => {
            return Config.height - texture.height * 2;
        });
        new Tiler(this.scene, "assets/images/top-soil.png", this.width, 1, (texture: PIXI.Texture) => {
            return Config.height - texture.height - 64;
        });

        const sky = PIXI.Sprite.from("assets/images/sky.png");
        this.scene.addChild(sky);

        this.addMonster(new Monster(this.scene, this, "mushroom", 2, 2));
    }

    public foreground(): void {
        const line = new PIXI.Graphics();
        line.lineStyle(1, 0xff0000);
        line.moveTo(0, this.floor);
        line.lineTo(this.width, this.floor);

        this.scene.addChild(line);
    }
}
