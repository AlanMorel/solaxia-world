import { Container, Graphics } from "pixi.js-legacy";
import Monster from "../monsters/Monster";
import Camera from "./Camera";
import Portal from "../portals/Portal";
import { PortalType } from "../portals/PortalType";
import Character from "../player/Character";
import WrapperContainer from "../utility/WrapperContainer";
import Tiler from "./Tiler";
import MapLoader, { MapData } from "../loaders/MapLoader";
import Projectile from "../projectiles/Projectile";
import { Rectangle, intersect } from "../utility/Rectangle";

interface ContainerMap {
    [key: string]: Container;
}

export default class Map extends WrapperContainer {

    private camera?: Camera;

    private id: number;
    private width = 0;
    private height = 0;
    private floor = 0;
    private monsters: Monster[] = [];
    private portals: Portal[] = [];
    private tilers: Tiler[] = [];
    private projectiles: Projectile[] = [];
    private characters: Character[] = [];

    private containers: ContainerMap = {
        "monsters": new Container(),
        "portals": new Container(),
        "tilers": new Container(),
        "characters": new Container(),
        "projectiles": new Container()
    };

    private changeMap: (portal: Portal) => Promise<void>;

    constructor(scene: Container, id: number, changeMap: (portal: Portal) => Promise<void>) {
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
            await tiler.init();

            this.tilers.push(tiler);
            this.containers["tilers"].addChild(tiler.getContainer());
        }

        for (const portalData of data.portals) {
            const portal = new Portal(this, portalData);
            await portal.init();

            this.portals.push(portal);
            this.containers["portals"].addChild(portal.getSprite());
        }

        for (const monsterData of data.monsters) {
            const monster = new Monster(this, monsterData.name, monsterData.x, monsterData.y);
            await monster.init();

            this.monsters.push(monster);
            this.containers["monsters"] = monster.getContainer();
        }

        this.container.addChild(this.containers["tilers"]);
        this.container.addChild(this.containers["portals"]);
        this.container.addChild(this.containers["monsters"]);
        this.container.addChild(this.containers["characters"]);
        this.container.addChild(this.containers["projectiles"]);

        this.addLine(0, this.floor, this.width, this.floor);
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

    public addCharacter(character: Character): void {
        this.characters.push(character);
        this.containers["characters"].addChild(character.getSprite());
    }

    public addProjectile(projectile: Projectile): void {
        this.projectiles.push(projectile);
        this.containers["projectiles"].addChild(projectile.getSprite());
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

        for (const character of this.characters) {
            character.update();
        }
    }

    private checkProjectileCollisions(projectile: Projectile): void {
        for (const monster of this.monsters) {
            if (intersect(projectile.getRectangle(), monster.getRectangle())) {
                this.projectileHit(monster, projectile);
            }
        }
    }

    private projectileHit(monster: Monster, projectile: Projectile): void {
        monster.damage(projectile.getDamage());

        this.removeProjectile(projectile);
    }

    public removeProjectile(projectile: Projectile): void {
        const projectileIndex = this.projectiles.indexOf(projectile);
        this.projectiles.splice(projectileIndex, 1);
        this.containers["projectiles"].removeChild(projectile.getSprite());
    }

    public removeMonster(monster: Monster): void {
        const monsterIndex = this.monsters.indexOf(monster);
        this.monsters.splice(monsterIndex, 1);
    }

    public respawnMonster(monster: Monster): void {
        setTimeout(() => {
            this.monsters.push(monster);
        }, 3000);
    }

    public getRectangle(): Rectangle {
        const rect: Rectangle = {
            left: 0,
            top: 0,
            right: this.width,
            bottom: this.height
        };
        return rect;
    }

    private addLine(x1: number, y1: number, x2: number, y2: number): void {
        const line = new Graphics();
        line.lineStyle(1, 0xff0000);
        line.moveTo(x1, y1);
        line.lineTo(x2, y2);

        this.container.addChild(line);
    }
}
