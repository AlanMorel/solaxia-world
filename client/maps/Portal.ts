import * as PIXI from "pixi.js-legacy";
import Map from "../maps/Map";
import MapObject from "./MapObject";
import ImageLoader from "../utility/ImageLoader";

export default class Portal extends MapObject {

    private map: Map;
    private scene;

    private id: number;
    private destMapId: number;
    private destMapPortal: number;

    constructor(scene: PIXI.Container, map: Map, data: any) {
        super();

        this.scene = scene;
        this.map = map;

        this.id = data.id;
        this.x = data.x;
        this.y = data.y;
        this.destMapId = data.destMapId;
        this.destMapPortal = data.destMapPortal;
    }

    public async init(): Promise<void> {
        let type = "";

        if (this.destMapId === this.map.getId()) {
            type = "internal";
        } else {
            type = "external";
        }
        
        const texture = await ImageLoader.loadAsync("/assets/images/tiles/portals/" + type + "-portal.png");
        const sprite = PIXI.Sprite.from(texture);
        sprite.anchor.set(0.5, 0);
        sprite.x = this.x;
        sprite.y = this.y;

        this.scene.addChild(sprite);
    }
}
