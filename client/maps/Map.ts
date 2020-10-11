import { Scene } from "pixi-scenes";
import Monster from "../monsters/Monster";

export default abstract class Map {

    protected scene: Scene;
    protected id: number;
    protected width: number;
    protected height: number;
    protected floor: number;
    protected monsters: Monster[];

    constructor(scene: Scene, id: number, width: number, height: number, floor: number) {
        this.scene = scene;
        this.id = id;
        this.width = width;
        this.height = height;
        this.floor = floor;
        this.monsters = [];
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

    public addMonster(monster: Monster): void {
        this.monsters.push(monster);
    }

    public update(): void {
        for (const monster of this.monsters) {
            monster.updateMonster();
        }
    }

    public abstract background(): void;
    public abstract foreground(): void;
}
