import * as PIXI from "pixi.js-legacy";
import Config from "../config";
import { Scene } from "pixi-scenes";

export default class HorizontalTiler {
    private sprites: PIXI.Sprite[];

    constructor(scene: Scene, path: string, number: number) {
        this.sprites = [];

        const texture = PIXI.Texture.from(path);

        texture.addListener("update", () => {
            for (var i = 0; i < number; i++) {
                const sprite = new PIXI.Sprite(texture);
                sprite.x = i * texture.width;
                sprite.y = Config.height - texture.height;

                this.sprites.push(sprite);
                scene.addChild(sprite);
            }
        });
    }
}