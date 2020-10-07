import { Scene } from "pixi-scenes";

export default abstract class Map {
    scene: Scene;
    id: number;
    
    constructor(scene: Scene, id: number) {
        this.scene = scene;
        this.id = id;
    }

    abstract background(): void;

    abstract foreground(): void;
}