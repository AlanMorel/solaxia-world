import * as PIXI from "pixi.js-legacy";
import { Scene } from "pixi-scenes";
import Map from "../maps/Map";
import Config from "../config";

export default class AnimatedMapObject {

    private activeSprite: PIXI.Sprite;
    private standingSprites: PIXI.Sprite [];
    private walkingSprites: PIXI.Sprite [];
    private speed: number;
    private dx: number;
    private dy: number;

    constructor(scene: Scene, path: string, standing: number, walking: number) {
        this.standingSprites = [];
        this.walkingSprites = [];

        for (var i = 0; i < standing; i++) {
            const texture = PIXI.Texture.from(path + "standing" + i + ".png");
            const sprite = PIXI.Sprite.from(texture);
            sprite.anchor.set(0.5, 0);
            this.standingSprites.push(sprite);
        }

        for (var i = 0; i < walking; i++) {
            const texture = PIXI.Texture.from(path + "walking" + i + ".png");
            const sprite = PIXI.Sprite.from(texture);
            sprite.anchor.set(0.5, 0);
            this.walkingSprites.push(sprite);
        }
        
        this.activeSprite = this.standingSprites[0];
        this.activeSprite.y = 50;
        this.activeSprite.texture.addListener("update", () => {
            this.activeSprite.x = this.activeSprite.texture.width / 2;
        });

        scene.addChild(this.activeSprite);

        this.speed = 3;
        this.dx = 0;
        this.dy = 0;
    }

    public getSprite() {
        return this.activeSprite;
    }

    public moveLeft() {
        this.lookLeft();
        this.dx = -this.speed;
    }

    public moveRight() {
        this.lookRight();
        this.dx = this.speed;
    }

    public lookLeft() {
        this.activeSprite.scale.x = -1;
    }

    public lookRight() {
        this.activeSprite.scale.x = 1;
    }

    public stop() {
        this.dx = 0;
    }

    public jump() {
        this.dy = -12;
    }

    public update(map: Map) {
        this.activeSprite.x += this.dx;
        this.activeSprite.y += this.dy;
        if (this.activeSprite.y < Config.height - 210) {
            this.dy += 1;
        } else {
            this.dy = 0;
            this.activeSprite.y = Config.height - 210;
        }
        if (this.activeSprite.x < this.activeSprite.width / 2) {
            this.activeSprite.x = this.activeSprite.width / 2;
        } else if (this.activeSprite.x > map.getWidth() - this.activeSprite.width / 2) {
            this.activeSprite.x = map.getWidth() - this.activeSprite.width / 2;
        }
    }
}
