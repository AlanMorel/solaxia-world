import * as PIXI from "pixi.js-legacy";
import { Scene } from "pixi-scenes";
import Map from "../maps/Map";
import { AnimationState } from "./AnimationState";
import MapObject from "./MapObject";

export default class AnimatedMapObject extends MapObject {

    protected map: Map;

    private standingSprites: PIXI.Sprite[];
    private walkingSprites: PIXI.Sprite[];

    private animationState: AnimationState;
    private activeSprite: PIXI.Sprite;
    private activeSpriteIndex: number;
    private lastSpriteChange: number;
    private activeSprites: PIXI.Sprite[];

    private speed: number;
    private dx: number;
    private dy: number;

    constructor(scene: Scene, map: Map, path: string, standing: number, walking: number) {
        super();

        this.map = map;
        this.standingSprites = [];
        this.walkingSprites = [];

        this.loadSprites(1, path, "standing", this.standingSprites);
        this.loadSprites(5, path, "walking", this.walkingSprites);

        this.activeSprite = new PIXI.Sprite();
        this.activeSprite.anchor.set(0.5, 0);
        this.activeSprite.texture = this.standingSprites[0].texture;
        this.activeSprite.texture.addListener("update", () => {
            this.x = this.activeSprite.texture.width / 2;
        });

        scene.addChild(this.activeSprite);

        this.activeSpriteIndex = 0;
        this.lastSpriteChange = Date.now();

        this.animationState = AnimationState.STANDING;
        this.activeSprites = this.standingSprites;

        this.speed = 3;
        this.dx = 0;
        this.dy = 0;
    }

    private loadSprites(number: number, path: string, state: string, sprites: PIXI.Sprite[]) {
        for (let i = 0; i < number; i++) {
            const texture = PIXI.Texture.from(path + state + i + ".png");
            const sprite = PIXI.Sprite.from(texture);
            sprite.anchor.set(0.5, 0);
            sprites.push(sprite);
        }
    }

    public getSprite() {
        return this.activeSprite;
    }

    public moveLeft() {
        this.lookLeft();
        this.dx = -this.speed;
        this.updateAnimationState(AnimationState.WALKING);
    }

    public moveRight() {
        this.lookRight();
        this.dx = this.speed;
        this.updateAnimationState(AnimationState.WALKING);
    }

    public lookLeft() {
        this.activeSprite.scale.x = -1;
    }

    public lookRight() {
        this.activeSprite.scale.x = 1;
    }

    public stop() {
        this.dx = 0;
        this.updateAnimationState(AnimationState.STANDING);
    }

    public jump() {
        this.dy = -12;
    }

    private updateAnimationState(animationState: AnimationState) {
        this.animationState = animationState;
        this.activeSpriteIndex = 0;
        this.lastSpriteChange =  Date.now() - 75;
        if (this.animationState === AnimationState.STANDING) {
            this.activeSprites = this.standingSprites;
        } else if (this.animationState === AnimationState.WALKING) {
            this.activeSprites = this.walkingSprites;
        } 
    }

    private updateTexture() {
        const now = Date.now();
        if (now - this.lastSpriteChange < 75) {
            return;
        }
        let nextSpriteIndex = ++this.activeSpriteIndex % this.activeSprites.length;
        this.activeSprite.texture = this.activeSprites[nextSpriteIndex].texture;
        this.lastSpriteChange = now;
    }

    private updateCoordinates() {
        this.x += this.dx;
        this.y += this.dy;
    }

    private handleJumping() {
        if (this.y < this.map.getFloor()) {
            this.dy += 1;
        } else {
            this.dy = 0;
            this.y = this.map.getFloor();
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
