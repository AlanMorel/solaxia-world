import * as PIXI from "pixi.js-legacy";
import ImageLoader from "../loaders/ImageLoader";
import Map from "./Map";

export default class Tiler {

    private map: Map;
    private path: string;
    private height: number;
    private y: number;

    constructor(map: Map, path: string, height: number, y: number) {
        this.map = map;
        this.path = path;
        this.height = height;
        this.y = y;
    }

    public async init(): Promise<void> {
        const texture = await ImageLoader.loadAsync(this.path);
        const xAmount = Math.ceil(this.map.getWidth() / texture.width);
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < xAmount; j++) {
                const sprite = new PIXI.Sprite(texture);
                sprite.x = j * texture.width;
                sprite.y = this.y + i * texture.height;
                this.map.getContainer().addChild(sprite);
            }
        }
    }
}
