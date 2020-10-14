import * as PIXI from "pixi.js-legacy";
import Map from "../maps/Map";
import MapObject from "../maps/MapObject";
import ImageLoader from "../utility/ImageLoader";
import { PortalType } from "./PortalType";

export default class Portal extends MapObject {

    private scene;

    private id: number;
    private destMapId: number;
    private destMapPortal: number;
    private type: PortalType;

    constructor(scene: PIXI.Container, map: Map, data: any) {
        super(map);

        this.scene = scene;

        this.id = data.id;
        this.x = data.x;
        this.y = data.y;
        this.destMapId = data.destMapId;
        this.destMapPortal = data.destMapPortal;
        this.type = this.destMapId === this.map.getId() ? PortalType.INTERNAL : PortalType.EXTERNAL;
    }

    public getId(): number {
        return this.id;
    }

    public getType(): PortalType {
        return this.type;
    }

    public getDestMapPortal(): number {
        return this.destMapPortal;
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
