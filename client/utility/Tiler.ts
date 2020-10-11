import * as PIXI from "pixi.js-legacy";
import { Scene } from "pixi-scenes";

export default class Tiler {

    constructor(scene: Scene, path: string, width: number, height: number, calcY: Function) {

        const container = new PIXI.Container();
        scene.addChild(container);

        const texture = PIXI.Texture.from(path);
        texture.addListener("update", () => {
            const startingY = calcY(texture);
            for (let i = 0; i < height; i++) {
                for (let j = 0; j < width / texture.width + 1; j++) {
                    const sprite = new PIXI.Sprite(texture);
                    sprite.x = j * texture.width;
                    sprite.y = startingY + i * texture.height;
                    container.addChild(sprite);
                }
            }
        });
    }
}
