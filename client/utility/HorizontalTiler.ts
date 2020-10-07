import * as PIXI from "pixi.js-legacy";
import Config from "../config";
import { Scene } from "pixi-scenes";

export default class HorizontalTiler {
    private sprites: PIXI.Sprite[];

    constructor(scene: Scene, path: string, number: number) {
        this.sprites = [];

        const texture = PIXI.Texture.from(path);

        for (var i = 0; i < number; i++) {
            const sprite = new PIXI.Sprite(texture);
            this.sprites.push(sprite);
            scene.addChild(sprite);
        }

        texture.addListener("update", () => {
            for (var i = 0; i < this.sprites.length; i++) {
                this.sprites[i].x = i * texture.width;
                this.sprites[i].y = Config.height - texture.height;
            }
        });
    }
}
