import * as PIXI from "pixi.js-legacy";
import Monster from "../monsters/Monster";
import Camera from "./Camera";
import Portal from "../portals/Portal";
import { PortalType } from "../portals/PortalType";
import Character from "../player/Character";
import Container from "../utility/Container";
import Tiler from "./Tiler";
import MapLoader, { MapData } from "../loaders/MapLoader";

export default class Map extends Container {

    protected camera?: Camera;

    protected id: number;
    protected width = 0;
    protected height = 0;
    protected floor = 0;
    protected monsters: Monster[] = [];
    protected portals: Portal[] = [];
    protected tilers: Tiler[] = [];

    protected changeMap: (portal: Portal) => Promise<void>;

    constructor(scene: PIXI.Container, id: number, changeMap: (portal: Portal) => Promise<void>) {
        super(scene);
        this.id = id;
        this.changeMap = changeMap;
    }

    public async init(): Promise<void> {
        const data: MapData = await MapLoader.loadMap(this.id);

        this.width = data.width;
        this.height = data.height;
        this.floor = data.floor;

        for (const tilersData of data.tilers) {
            const tiler = new Tiler(this, "assets/images/tiles/" + tilersData.tile + ".png", tilersData.height, tilersData.y);
            this.tilers.push(tiler);
        }

        for (const portalData of data.portals) {
            const portal = new Portal(this, portalData);
            this.portals.push(portal);
        }

        for (const monsterData of data.monsters) {
            const monster = new Monster(this, monsterData.name, monsterData.x, monsterData.y);
            this.monsters.push(monster);
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

    public getPortals(): Portal[] {
        return this.portals;
    }

    public setCamera(camera: Camera): void {
        this.camera = camera;
    }

    public getCamera(): Camera | undefined {
        return this.camera;
    }

    public usePortal(character: Character, portal: Portal): void {
        if (portal.getType() === PortalType.INTERNAL) {
            const destPortal = this.portals.find((p: Portal) => p.getId() === portal.getDestPortal());
            if (destPortal) {
                character.setX(destPortal.getX());
                character.setY(destPortal.getY() + 150);
            }
        } else if (portal.getType() === PortalType.EXTERNAL) {
            this.changeMap(portal);
        }
    }

    public update(): void {
        if (this.camera) {
            this.camera.update();
        }
        for (const monster of this.monsters) {
            monster.update();
        }
    }

    public async background(): Promise<void> {
        for (const tiler of this.tilers) {
            await tiler.init();
        }

        for (const portal of this.portals) {
            await portal.init();
        }

        for (const monster of this.monsters) {
            await monster.init();
        }
    }

    public async foreground(): Promise<void> {
        const line = new PIXI.Graphics();
        line.lineStyle(1, 0xff0000);
        line.moveTo(0, this.floor);
        line.lineTo(this.width, this.floor);

        this.scene.addChild(line);
    }
}
