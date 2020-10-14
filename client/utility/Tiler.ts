import * as PIXI from "pixi.js-legacy";
import ImageLoader from "./ImageLoader";

export default class Tiler {

    private container: PIXI.Container = new PIXI.Container();
    private path: string;
    private width: number;
    private height: number;
    private calcY: (texture: PIXI.Texture) => number;

    constructor(scene: PIXI.Container, path: string, width: number, height: number, calcY: (texture: PIXI.Texture) => number) {
        this.path = path;
        this.width = width;
        this.height = height;
        this.calcY = calcY;
        scene.addChild(this.container);
    }

    public async init() {
        const texture = await ImageLoader.loadAsync(this.path);
        const startingY = this.calcY(texture);
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < Math.ceil(this.width / texture.width); j++) {
                const sprite = new PIXI.Sprite(texture);
                sprite.x = j * texture.width;
                sprite.y = startingY + i * texture.height;
                this.container.addChild(sprite);
            }
        }
    }
}
