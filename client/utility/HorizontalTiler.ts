import * as PIXI from "pixi.js-legacy";
import { Scene } from "pixi-scenes";

export default class HorizontalTiler {

    constructor(scene: Scene, path: string, width: number, onLoad: Function) {

        const container = new PIXI.Container();
        scene.addChild(container);

        const texture = PIXI.Texture.from(path);
        texture.addListener("update", () => {
            for (var i = 0; i < width / texture.width + 1; i++) {
                const sprite = new PIXI.Sprite(texture);
                sprite.x = i * texture.width;
                onLoad(texture, sprite);
                container.addChild(sprite);
            }
        });
    }
}
