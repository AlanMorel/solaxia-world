import Map from "../maps/Map";
import NameTag from "./NameTag";
import AnimatedMapObject from "../maps/AnimatedMapObject";

export default class Character extends AnimatedMapObject {

    private nameTag: NameTag;

    constructor(map: Map, username: string) {
        super(map.getContainer(), map, "character");
        this.nameTag = new NameTag(map.getContainer(), username);
        this.y = 50;
        this.speed = 5;
    }

    public updateCharacter(): void {
        this.update(this.map);
        this.nameTag.update(this.getSprite());
    }
}
