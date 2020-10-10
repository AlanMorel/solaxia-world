import { Scene } from "pixi-scenes";
import Map from "../maps/Map";
import NameTag from "./NameTag";
import AnimatedMapObject from "../maps/AnimatedMapObject";

export default class Character extends AnimatedMapObject {

    private map: Map;
    private nameTag: NameTag;

    constructor(scene: Scene, map: Map, username: string) {
        super(scene, "assets/images/player/", 1, 5);
        this.map = map;
        this.nameTag = new NameTag(scene, username);
    }

    public updateCharacter() {
        this.update(this.map);
        this.nameTag.update(this.getSprite());
    }
}
