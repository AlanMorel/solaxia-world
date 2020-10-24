import { Container } from "pixi.js-legacy";
import Map from "../maps/Map";

export default abstract class Effect {

    protected container: Container;
    protected map: Map;
    protected startTime = Date.now();

    constructor(map: Map) {
        this.container = new Container();
        this.map = map;
    }

    public getContainer(): Container {
        return this.container;
    }

    public getElapsed(): number {
        return Date.now() - this.startTime;
    }

    public getElapsedSeconds(): number {
        return this.getElapsed() / 1000;
    }

    public abstract update(): void;
}
