import { Container, Texture, Sprite } from "pixi.js-legacy";
import ImageLoader from "../loaders/ImageLoader";
import Camera from "./Camera";
import Map from "./Map";

export default class Tiler {

    private map: Map;
    private container = new Container();
    private path: string;
    private height: number;
    private y: number;
    private xRate: number;
    private yRate: number;

    constructor(map: Map, path: string, height: number, y: number, xRate: number, yRate: number) {
        this.map = map;
        this.path = path;
        this.height = height;
        this.y = y;
        this.xRate = xRate;
        this.yRate = yRate;
    }

    public async init(): Promise<void> {
        const texture = await ImageLoader.loadAsync(this.path);
        const xAmount = Math.ceil(this.map.getWidth() / texture.width);

        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < xAmount; j++) {
                this.addSprite(texture, i, j);
            }
        }
    }

    private addSprite(texture: Texture, i: number, j: number): void {
        const sprite = new Sprite(texture);
        sprite.x = j * texture.width;
        sprite.y = this.y + i * texture.height;

        this.container.addChild(sprite);
    }

    public getContainer(): Container {
        return this.container;
    }

    public update(camera: Camera): void {
        this.container.x = camera.getX() * this.xRate / 100;
        this.container.y = camera.getY() * this.yRate / 100;
    }
}
