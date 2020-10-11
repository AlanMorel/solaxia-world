import * as PIXI from "pixi.js-legacy";
import { Scene } from "pixi-scenes";
import Map from "./Map";
import Config from "../config";
import Tiler from "../utility/Tiler";

export default class Map1 extends Map {

    constructor(scene: Scene) {
        super(scene, 1, Config.width, Config.height, Config.height - 210);
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
    }

    public foreground(): void {

    }
}
