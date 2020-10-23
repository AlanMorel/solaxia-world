import Map from "../maps/Map";
import NameTag from "./NameTag";
import AnimatedLifeMapObject from "../maps/AnimatedLifeMapObject";

export default class Character extends AnimatedLifeMapObject {

    private username: string;
    private nameTag: NameTag;
    private level = 0;

    constructor(map: Map, username: string) {
        super(map, "character");
        this.username = username;
        this.nameTag = new NameTag(this.container, username);
        this.y = 50;
        this.speed = 5;
        this.map.getContainer().addChild(this.container);
    }

    public gainExp(exp: number): void {
        this.exp += exp;
    }

    public getUsername(): string {
        return this.username;
    }

    public getLevel(): number {
        return this.level;
    }

    public update(): void {
        super.update();
        this.nameTag.update(this.getSprite());
    }
}
