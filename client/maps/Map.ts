import * as PIXI from "pixi.js-legacy";
import Monster from "../monsters/Monster";
import Camera from "./Camera";

export default abstract class Map {

    protected scene: PIXI.Container;
    protected camera?: Camera;

    protected id: number;
    protected width: number;
    protected height: number;
    protected floor: number;
    protected monsters: Monster[];

    constructor(scene: PIXI.Container, id: number, width: number, height: number, floor: number) {
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

    public setCamera(camera: Camera): void {
        this.camera = camera;
    }

    public getCamera(): Camera | undefined {
        return this.camera;
    }

    public update(): void {
        if (this.camera) {
            this.camera.update();
        }
        for (const monster of this.monsters) {
            monster.updateMonster();
        }
    }

    public abstract background(): void;
    public abstract foreground(): void;
}
