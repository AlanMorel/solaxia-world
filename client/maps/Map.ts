import * as PIXI from "pixi.js-legacy";
import Monster from "../monsters/Monster";
import Camera from "./Camera";
import Portal from "../portals/Portal";
import { PortalType } from "../portals/PortalType";
import Character from "../player/Character";
import Container from "../utility/Container";
import Tiler from "./Tiler";
import MapLoader, { MapData } from "../loaders/MapLoader";
import Projectile from "./Projectile";
import { Rectangle, intersect } from "../utility/Rectangle";

export default class Map extends Container {

    private camera?: Camera;

    private id: number;
    private width = 0;
    private height = 0;
    private floor = 0;
    private monsters: Monster[] = [];
    private portals: Portal[] = [];
    private tilers: Tiler[] = [];
    private projectiles: Projectile[] = [];

    private changeMap: (portal: Portal) => Promise<void>;

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
            const tiler = new Tiler(this, "tiles/" + tilersData.tile, tilersData.height, tilersData.y, tilersData.xRate || 0, tilersData.yRate || 0);
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

    public addProjectile(projectile: Projectile): void {
        this.projectiles.push(projectile);
        this.getContainer().addChild(projectile.getSprite());
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

            for (const tiler of this.tilers) {
                tiler.update(this.camera);
            }
        }
        for (const monster of this.monsters) {
            monster.update();
        }

        for (const projectile of this.projectiles) {
            projectile.update();
            this.checkProjectileCollisions(projectile);
        }
    }

    private checkProjectileCollisions(projectile: Projectile): void {

        for (const monster of this.monsters) {
            const monsterRect: Rectangle = {
                left:   monster.getX() - monster.getSprite().width / 2,
                top:    monster.getY() - monster.getSprite().height / 2,
                right:  monster.getX() + monster.getSprite().width / 2,
                bottom: monster.getY() + monster.getSprite().height / 2
            };

            if (intersect(projectile.getRectangle(), monsterRect)) {
                this.projectileHit(monster, projectile);
            }
        }
    }

    private projectileHit(monster: Monster, projectile: Projectile): void {
        monster.damage(projectile.getDamage());

        this.removeProjectile(projectile);

        if (monster.isDead()) {
            console.log("kill");
        }
    }

    public removeProjectile(projectile: Projectile): void {
        const projectileIndex = this.projectiles.indexOf(projectile);
        this.projectiles.splice(projectileIndex, 1);
        this.container.removeChild(projectile.getSprite());
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

        this.container.addChild(line);
    }
}
