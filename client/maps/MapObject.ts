import Map from "./Map";

export default class MapObject {

    protected map: Map;
    protected x: number;
    protected y: number;

    constructor(map: Map) {
        this.map = map;
        this.y = 0;
        this.x = 0;
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
}
