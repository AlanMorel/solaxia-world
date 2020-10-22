import { Container, Sprite } from "pixi.js-legacy";
import Map from "./Map";

export default abstract class MapObject {

    protected map: Map;
    protected container: Container = new Container();
    protected sprite: Sprite = new Sprite();

    protected x = 0;
    protected y = 0;

    constructor(map: Map) {
        this.map = map;
    }

    public addChild(): void {
        this.container.addChild(this.sprite);
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public getMap(): Map {
        return this.map;
    }

    public setX(value: number): void {
        this.x = value;
    }

    public setY(value: number): void {
        this.y = value;
    }

    public getContainer(): Container {
        return this.container;
    }

    public getSprite(): Sprite {
        return this.sprite;
    }
}
