import { Scene } from "pixi-scenes";

export default abstract class Map {

    protected scene: Scene;
    protected id: number;
    protected width: number;
    protected height: number;
    protected floor: number;

    constructor(scene: Scene, id: number, width: number, height: number, floor: number) {
        this.scene = scene;
        this.id = id;
        this.width = width;
        this.height = height;
        this.floor = floor;
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public getFloor(): number {
        return this.floor;
    }

    public abstract background(): void;

    public abstract foreground(): void;
}
