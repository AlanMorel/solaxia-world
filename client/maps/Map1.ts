import * as PIXI from "pixi.js-legacy";
import { Scene } from "pixi-scenes";
import Map from "./Map";
import Config from "../config";
import HorizontalTiler from "../utility/HorizontalTiler";

export default class Map1 extends Map {

    constructor(scene: Scene) {
        super(scene, 1, Config.width, Config.height);
    }

    background() {
        const soilsHorizontalTiler = new HorizontalTiler(this.scene, "assets/images/soil.png", 20);
        const topSoilsHorizontalTiler = new HorizontalTiler(this.scene, "assets/images/top-soil.png", 20);

        const sky = PIXI.Sprite.from("assets/images/sky.png");
        this.scene.addChild(sky);
    }

    foreground() {
        
    }
}