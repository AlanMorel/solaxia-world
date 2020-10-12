import * as PIXI from "pixi.js-legacy";

export default class Tiler {

    constructor(scene: PIXI.Container, path: string, width: number, height: number, calcY: (texture: PIXI.Texture) => number) {

        const container = new PIXI.Container();
        scene.addChild(container);

        const texture = PIXI.Texture.from(path);
        if (texture.width > 1 && texture.height > 1) {
            this.onUpdate(container, texture, width, height, calcY);
        } else {
            texture.addListener("update", () => {
                this.onUpdate(container, texture, width, height, calcY);
            });
        }
    }

    private onUpdate(container: PIXI.Container, texture: PIXI.Texture, width: number, height: number, calcY: (texture: PIXI.Texture) => number): void{
        const startingY = calcY(texture);
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < Math.ceil(width / texture.width); j++) {
                const sprite = new PIXI.Sprite(texture);
                sprite.x = j * texture.width;
                sprite.y = startingY + i * texture.height;
                container.addChild(sprite);
            }
        }
    }
}
