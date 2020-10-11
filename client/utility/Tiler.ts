import * as PIXI from "pixi.js-legacy";

export default class Tiler {

    constructor(scene: PIXI.Container, path: string, width: number, height: number, calcY: (texture: PIXI.Texture) => number) {

        const container = new PIXI.Container();
        scene.addChild(container);

        const texture = PIXI.Texture.from(path);
        texture.addListener("update", () => {
            const startingY = calcY(texture);
            for (let i = 0; i < height; i++) {
                for (let j = 0; j < Math.ceil(width / texture.width); j++) {
                    const sprite = new PIXI.Sprite(texture);
                    sprite.x = j * texture.width;
                    sprite.y = startingY + i * texture.height;
                    container.addChild(sprite);
                }
            }
        });
    }
}
