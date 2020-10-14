import * as PIXI from "pixi.js-legacy";
import Monster from "../monsters/Monster";
import Camera from "./Camera";

export default abstract class Map {

    protected scene: PIXI.Container;
    protected camera?: Camera;

    protected id: number;
    protected width = 0;
    protected height = 0;
    protected floor = 0;
    protected monsters: Monster[];

    constructor(scene: PIXI.Container, id: number) {
        this.scene = new PIXI.Container();
        this.id = id;
        this.monsters = [];

        scene.addChild(this.scene);
    }

    public async init(): Promise<void> {
        const response = await fetch("/assets/data/maps/" + this.id + ".json");
        const data = await response.json();

        this.width = data.width;
        this.height = data.height;
        this.floor = data.floor;
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

    public getContainer(): PIXI.Container {
        return this.scene;
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
