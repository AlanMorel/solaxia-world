import * as PIXI from "pixi.js-legacy";
import { Scene } from "pixi-scenes";
import Map from "./Map";
import Config from "../config";
import HorizontalTiler from "../utility/HorizontalTiler";

export default class Map1 extends Map {

    constructor(scene: Scene) {
        super(scene, 1, Config.width, Config.height);
    }

    public background() {
        new HorizontalTiler(this.scene, "assets/images/soil.png", this.width, (texture: PIXI.Texture, sprite: PIXI.Sprite) => {
            sprite.y = Config.height - texture.height;
        });
        new HorizontalTiler(this.scene, "assets/images/soil.png", this.width, (texture: PIXI.Texture, sprite: PIXI.Sprite) => {
            sprite.y = Config.height - texture.height * 2;
        });
        new HorizontalTiler(this.scene, "assets/images/top-soil.png", this.width, (texture: PIXI.Texture, sprite: PIXI.Sprite) => {
            sprite.y = Config.height - texture.height - 64;
        });

        const sky = PIXI.Sprite.from("assets/images/sky.png");
        this.scene.addChild(sky);
    }

    public foreground() {
        
    }
}
