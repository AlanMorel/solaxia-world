import Map from "../maps/Map";
import NameTag from "./NameTag";
import AnimatedLifeMapObject from "../maps/AnimatedLifeMapObject";

export default class Character extends AnimatedLifeMapObject {

    private nameTag: NameTag;

    constructor(map: Map, username: string) {
        super(map, "character");
        this.nameTag = new NameTag(this.container, username);
        this.y = 50;
        this.speed = 5;
        this.map.getContainer().addChild(this.container);
    }

    public update(): void {
        super.update();
        this.nameTag.update(this.getSprite());
    }
}
