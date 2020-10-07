import * as PIXI from "pixi.js-legacy";
import Config from "../config";
import { Scene } from "pixi-scenes";

export default class LoginScene extends Scene {

    public init(): void {
        const sky = PIXI.Sprite.from("assets/images/sky.png");

        const clouds = PIXI.Sprite.from("assets/images/clouds.png");
        clouds.y = 200;

        const trees = PIXI.Sprite.from("assets/images/trees.png");
        trees.y = Config.height - 415;

        const style = new PIXI.TextStyle({
            fontFamily: "'VCR OSD Mono', Courier, monospace",
            fontSize: "64px",
            fontWeight: "bold",
            fill: 0x000000
        });

        const richText = new PIXI.Text("Solaxia World", style);
        richText.anchor.set(0.5, 0.5);
        richText.x = Config.width / 2;
        richText.y = 200;

        this.addChild(sky);
        this.addChild(clouds);
        this.addChild(trees);

        this.addChild(richText);
    }

    public start(): void {
        
    }

    public update(delta: number): void {
        
    }
}
