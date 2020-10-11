import { Scene } from "pixi-scenes";
import Map from "../maps/Map";
import NameTag from "./NameTag";
import AnimatedMapObject from "../maps/AnimatedMapObject";

export default class Character extends AnimatedMapObject {

    private nameTag: NameTag;

    constructor(scene: Scene, map: Map, username: string) {
        super(scene, map, "assets/images/character/", 1, 5);
        this.nameTag = new NameTag(scene, username);
        this.y = 50;
    }

    public updateCharacter() {
        this.update(this.map);
        this.nameTag.update(this.getSprite());
    }
}
