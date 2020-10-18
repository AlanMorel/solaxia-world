import { Sprite } from "pixi.js-legacy";
import ImageLoader from "../loaders/ImageLoader";
import Character from "../player/Character";
import MapObject from "./MapObject";

export default class Projectile extends MapObject {

    private character: Character;

    private damage: number;
    private angle: number
    private dAngle: number;
    private dx: number;
    private dy = 0;
    private sprite: Sprite;

    constructor(character: Character, damage: number) {
        super(character.getMap());
        this.character = character;
        this.x = character.getX();
        this.y = character.getY() + 30;
        this.dx = 7 * this.getDirectionMultiplier(character);
        this.damage = damage;
        this.angle = 0;
        this.dAngle = 10;
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

    public async init(path: string): Promise<void> {
        const texture = await ImageLoader.loadAsync("projectiles/" + path + ".png");
        this.sprite.texture = texture;
    }

    public update(): void {
        this.x += this.dx;
        this.angle += this.dAngle;

        this.sprite.x = this.x;
        this.sprite.angle = this.angle;
    }
}
