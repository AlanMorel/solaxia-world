import * as PIXI from "pixi.js-legacy";
import Config from "../config";
import { Scene } from "pixi-scenes";
import HorizontalTiler from "../utility/HorizontalTiler";

export default class LoginScene extends Scene {

    private soilsHorizontalTiler: HorizontalTiler;
    private topSoilsHorizontalTiler: HorizontalTiler;

    constructor() {
        super();
        
        this.soilsHorizontalTiler = new HorizontalTiler(this, "assets/images/soil.png", 20);
        this.topSoilsHorizontalTiler = new HorizontalTiler(this, "assets/images/top-soil.png", 20);

        const sky = PIXI.Sprite.from("assets/images/sky.png");
        this.addChild(sky);
    }

    public start(): void {
        if (this.app) {
            this.app.renderer.backgroundColor = 0x80c2fb;
        }
    }

    public update(delta: number): void {

    }
}
