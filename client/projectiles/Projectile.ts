import { Sprite } from "pixi.js-legacy";
import ImageLoader from "../loaders/ImageLoader";
import Character from "../player/Character";
import { intersect, Rectangle } from "../utility/Rectangle";
import MapObject from "../maps/MapObject";

export default abstract class Projectile extends MapObject {

    protected character: Character;
    protected name: string;

    protected damage: number;
    protected angle: number;
    protected dAngle: number;
    protected dx: number;
    protected dy: number;
    protected sprite: Sprite;

    constructor(character: Character, name: string, damage: number, dx: number, dy: number, dAngle: number) {
        super(character.getMap());
        this.character = character;
        this.name = name;

        this.x = character.getX();
        this.y = character.getY() + character.getSprite().height / 2;
        this.damage = damage;

        const directionMultiplier = this.getDirectionMultiplier(character);

        this.dx = dx * directionMultiplier;
        this.dy = dy;

        this.angle = 0;
        this.dAngle = dAngle * directionMultiplier;

        this.sprite = new Sprite();
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }

    private getDirectionMultiplier(character: Character): number {
        if (character.isLookingLeft()) {
            return -1;
        } else if (character.isLookingRight()) {
            return 1;
        }
        return 0;
    }

    public getSprite(): Sprite {
        return this.sprite;
    }

    public getDamage(): number {
        return this.damage;
    }

    public async init(): Promise<void> {
        const texture = await ImageLoader.loadAsync("projectiles/" + this.name);
        this.sprite.texture = texture;
    }

    public getCharacter(): Character {
        return this.character;
    }

    private insideMap(): boolean {
        return intersect(this.getRectangle(), this.map.getRectangle());
    }

    public getRectangle(): Rectangle {
        const rect: Rectangle = {
            left:   this.x - this.sprite.width / 2,
            top:    this.y - this.sprite.height / 2,
            right:  this.x + this.sprite.width / 2,
            bottom: this.y + this.sprite.height / 2
        };
        return rect;
    }

    public update(): void {
        this.x += this.dx;
        this.y += this.dy;
        this.angle += this.dAngle;

        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.angle = this.angle;

        if (!this.insideMap()) {
            this.map.removeProjectile(this);
        }
    }
}
