import { Scene } from "pixi-scenes";

export default abstract class Map {

    protected scene: Scene;
    protected id: number;
    protected width: number;
    protected height: number;
    
    constructor(scene: Scene, id: number, width: number, height: number) {
        this.scene = scene;
        this.id = id;
        this.width = width;
        this.height = height;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    abstract background(): void;

    abstract foreground(): void;
}
