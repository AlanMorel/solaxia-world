import * as PIXI from "pixi.js-legacy";
import Monster from "../monsters/Monster";
import Camera from "./Camera";
import Portal from "./Portal";

interface MapData {
    id: number,
    width: number,
    height: number,
    floor: number,
    portals: [
        {
            id: number,
            x: number,
            y: number,
            destMapId: number,
            destMapPortal: number
        }
    ]
};

export default abstract class Map {

    protected scene: PIXI.Container;
    protected camera?: Camera;

    protected id: number;
    protected width = 0;
    protected height = 0;
    protected floor = 0;
    protected monsters: Monster[] = [];
    protected portals: Portal[] = [];

    constructor(scene: PIXI.Container, id: number) {
        this.scene = new PIXI.Container();
        this.id = id;
        
        scene.addChild(this.scene);
    }

    public async init(): Promise<void> {
        const response = await fetch("/assets/data/maps/" + this.id + ".json");
        const data: MapData = await response.json();

        this.width = data.width;
        this.height = data.height;
        this.floor = data.floor;

        for (const portalData of data.portals) {
            const portal = new Portal(this.scene, this, portalData);
            this.portals.push(portal);
        }

        for (let i = 0; i < 3; i++) {
            const monster = new Monster(this.scene, this, "mushroom");
            this.monsters.push(monster);
        }
    }

    protected async loadEntities() {
        for (const portal of this.portals) {
            await portal.init();
        }

        for (const monster of this.monsters) {
            await monster.initMonster();
        }
    }

    public getId(): number {
        return this.id;
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
