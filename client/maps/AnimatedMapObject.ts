import * as PIXI from "pixi.js-legacy";
import { Scene } from "pixi-scenes";
import Map from "../maps/Map";
import Config from "../config";
import { AnimatedState } from "./AnimatedState";

export default class AnimatedMapObject {

    private standingSprites: PIXI.Sprite [];
    private walkingSprites: PIXI.Sprite [];

    private animationState: AnimatedState;
    private activeSprite: PIXI.Sprite;
    private activeSpriteIndex: number;
    private lastSpriteChange: number;

    private x;
    private y;
    private speed: number;
    private dx: number;
    private dy: number;

    constructor(scene: Scene, path: string, standing: number, walking: number) {
        this.standingSprites = [];
        this.walkingSprites = [];

        for (let i = 0; i < standing; i++) {
            const texture = PIXI.Texture.from(path + "standing" + i + ".png");
            const sprite = PIXI.Sprite.from(texture);
            sprite.anchor.set(0.5, 0);
            this.standingSprites.push(sprite);
        }

        for (let i = 0; i < walking; i++) {
            const texture = PIXI.Texture.from(path + "walking" + i + ".png");
            const sprite = PIXI.Sprite.from(texture);
            sprite.anchor.set(0.5, 0);
            this.walkingSprites.push(sprite);
        }

        this.activeSprite = new PIXI.Sprite();
        this.activeSprite.anchor.set(0.5, 0);
        this.activeSprite.texture = this.standingSprites[0].texture;
        this.activeSprite.texture.addListener("update", () => {
            this.x = this.activeSprite.texture.width / 2;
        });

        scene.addChild(this.activeSprite);

        this.activeSpriteIndex = 0;
        this.lastSpriteChange = Date.now();

        this.animationState = AnimatedState.STANDING;

        this.y = 50;
        this.x = 0;
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
        this.updateAnimationState(AnimatedState.WALKING);
    }

    public moveRight() {
        this.lookRight();
        this.dx = this.speed;
        this.updateAnimationState(AnimatedState.WALKING);
    }

    public lookLeft() {
        this.activeSprite.scale.x = -1;
    }

    public lookRight() {
        this.activeSprite.scale.x = 1;
    }

    public stop() {
        this.dx = 0;
        this.updateAnimationState(AnimatedState.STANDING);
    }

    public jump() {
        this.dy = -12;
    }

    private updateAnimationState(animationState: AnimatedState) {
        this.animationState = animationState;
        this.activeSpriteIndex = 0;
        this.lastSpriteChange =  Date.now() - 75;
    }

    private getSprites() {
        if (this.animationState === AnimatedState.STANDING) {
            return this.standingSprites;
        } else if (this.animationState === AnimatedState.WALKING) {
            return this.walkingSprites;
        } else {
            return this.standingSprites;
        }
    }

    private updateTexture() {
        const now = Date.now();
        if (now - this.lastSpriteChange < 75) {
            return;
        }
        const sprites = this.getSprites();
        let nextSpriteIndex = ++this.activeSpriteIndex % sprites.length;
        this.activeSprite.texture = sprites[nextSpriteIndex].texture;
        this.lastSpriteChange = now;
    }

    private updateCoordinates() {
        this.x += this.dx;
        this.y += this.dy;
    }

    private handleJumping() {
        if (this.y < Config.height - 210) {
            this.dy += 1;
        } else {
            this.dy = 0;
            this.y = Config.height - 210;
        }
    }

    private handleOutOfBounds(map: Map) {
        if (this.x < this.activeSprite.width / 2) {
            this.x = this.activeSprite.width / 2;
        } else if (this.x > map.getWidth() - this.activeSprite.width / 2) {
            this.x = map.getWidth() - this.activeSprite.width / 2;
        }
    }

    private updateSprite() {
        this.activeSprite.x = this.x;
        this.activeSprite.y = this.y;
    }

    public update(map: Map) {
        this.updateTexture();
        this.updateCoordinates();
        this.handleJumping();
        this.handleOutOfBounds(map);
        this.updateSprite();    
    }
}
