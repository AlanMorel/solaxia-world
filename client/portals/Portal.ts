import * as PIXI from "pixi.js-legacy";
import Map from "../maps/Map";
import MapObject from "../maps/MapObject";
import ImageLoader from "../loaders/ImageLoader";
import { PortalType } from "./PortalType";
import { MapPortalsData } from "../loaders/MapLoader";

export default class Portal extends MapObject {

    private scene;

    private id: number;
    private destMap: number;
    private destPortal: number;
    private type: PortalType;

    constructor(scene: PIXI.Container, map: Map, data: MapPortalsData) {
        super(map);

        this.scene = scene;

        this.id = data.id;
        this.x = data.x;
        this.y = data.y;
        this.destMap = data.destMap;
        this.destPortal = data.destPortal;
        this.type = this.destMap === this.map.getId() ? PortalType.INTERNAL : PortalType.EXTERNAL;
    }

    public getId(): number {
        return this.id;
    }

    public getType(): PortalType {
        return this.type;
    }

    public getDestMap(): number {
        return this.destMap;
    }

    public getDestPortal(): number {
        return this.destPortal;
    }

    public async init(): Promise<void> {
        const texture = await ImageLoader.loadAsync("/assets/images/tiles/portals/" + this.type + "-portal.png");
        const sprite = PIXI.Sprite.from(texture);
        sprite.anchor.set(0.5, 0);
        sprite.x = this.x;
        sprite.y = this.y;

        this.scene.addChild(sprite);
    }
}
