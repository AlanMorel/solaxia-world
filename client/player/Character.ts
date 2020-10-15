import Map from "../maps/Map";
import NameTag from "./NameTag";
import AnimatedMapObject from "../maps/AnimatedMapObject";

export default class Character extends AnimatedMapObject {

    private nameTag: NameTag;

    constructor(map: Map, username: string) {
        super(map, "character");
        this.nameTag = new NameTag(map.getContainer(), username);
        this.y = 50;
        this.speed = 5;
    }

    public update(): void {
        super.update();
        this.nameTag.update(this.getSprite());
    }
}
