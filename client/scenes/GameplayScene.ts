import * as PIXI from "pixi.js-legacy";
import Config from "../config";
import { Scene } from "pixi-scenes";

export default class LoginScene extends Scene {

    private soils: PIXI.Sprite[];
    private topSoils: PIXI.Sprite[];

    constructor() {
        super();
        
        this.soils = [];
        this.topSoils = [];

        const sky = PIXI.Sprite.from("assets/images/sky.png");
        this.addChild(sky);

        const soilTexture = PIXI.Texture.from("assets/images/soil.png");
        const topSoilTexture = PIXI.Texture.from("assets/images/top-soil.png");

        soilTexture.addListener("update", () => {
            for (var i = 0; i < 20; i++) {
                const soil = new PIXI.Sprite(soilTexture);
                soil.x = i * soilTexture.width;
                soil.y = Config.height - soilTexture.height;
                this.soils.push(soil);
                this.addChild(soil);
            }
        });

        topSoilTexture.addListener("update", () => {
            for (var i = 0; i < 20; i++) {
                const topSoil = new PIXI.Sprite(topSoilTexture);
                topSoil.x = i * topSoilTexture.width;
                topSoil.y = Config.height - topSoilTexture.height;
                this.topSoils.push(topSoil);
                this.addChild(topSoil);
            }
        });
    }

    public start(): void {
        if (this.app) {
            this.app.renderer.transparent = false;
            this.app.renderer.backgroundColor = 0x80c2fb;
        }
    }

    public update(delta: number): void {
    }
}
