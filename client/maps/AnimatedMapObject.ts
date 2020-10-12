import * as PIXI from "pixi.js-legacy";
import Map from "../maps/Map";
import { AnimationState } from "./AnimationState";
import MapObject from "./MapObject";

export default class AnimatedMapObject extends MapObject {

    protected map: Map;

    private sprites: {[key in keyof typeof AnimationState]: PIXI.Sprite[]} = {
        STANDING: [],
        WALKING: []
    };

    private animationState: AnimationState = AnimationState.STANDING;

    private activeSprite: PIXI.Sprite;
    private activeSpriteIndex = 0;
    private lastSpriteChange = Date.now();

    protected speed = 3;
    private dx = 0;
    private dy = 0;

    constructor(scene: PIXI.Container, map: Map, base: string, standing: number, walking: number) {
        super();

        this.map = map;

        this.loadSprites(standing, base, "standing", AnimationState.STANDING);
        this.loadSprites(walking, base, "walking", AnimationState.WALKING);

        this.activeSprite = new PIXI.Sprite();
        this.activeSprite.anchor.set(0.5, 0);
        this.activeSprite.scale.x = -1;
        this.activeSprite.texture = this.sprites[AnimationState.STANDING][0].texture;
        this.activeSprite.texture.addListener("update", () => {
            this.x = this.activeSprite.texture.width / 2;
        });

        scene.addChild(this.activeSprite);
    }

    private loadSprites(number: number, base: string, name: string, state: AnimationState): void {
        let sprites: PIXI.Sprite[] = [];

        for (let i = 0; i < number; i++) {
            const texture = PIXI.Texture.from(base + name + i + ".png");
            const sprite = PIXI.Sprite.from(texture);
            sprite.anchor.set(0.5, 0);
            sprites.push(sprite);
        }

        this.sprites[state] = sprites;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public getSprite(): PIXI.Sprite {
        return this.activeSprite;
    }

    public moveLeft(): void {
        this.lookLeft();
        this.dx = -this.speed;
        this.updateAnimationState(AnimationState.WALKING);
    }

    public moveRight(): void {
        this.lookRight();
        this.dx = this.speed;
        this.updateAnimationState(AnimationState.WALKING);
    }

    public lookLeft(): void {
        this.activeSprite.scale.x = 1;
    }

    public lookRight(): void {
        this.activeSprite.scale.x = -1;
    }

    public stop(): void {
        this.dx = 0;
        this.updateAnimationState(AnimationState.STANDING);
    }

    public jump(): void {
        this.dy = -12;
    }

    private updateAnimationState(animationState: AnimationState): void {
        this.animationState = animationState;
        this.activeSpriteIndex = 0;
        this.lastSpriteChange =  Date.now();
        this.activeSprite.texture = this.sprites[this.animationState][this.activeSpriteIndex].texture;
    }

    private updateTexture(): void {
        const now = Date.now();
        if (now - this.lastSpriteChange < 75) {
            return;
        }
        const nextSpriteIndex = ++this.activeSpriteIndex % this.sprites[this.animationState].length;
        this.activeSprite.texture = this.sprites[this.animationState][nextSpriteIndex].texture;
        this.lastSpriteChange = now;
    }

    private updateCoordinates(): void {
        this.x += this.dx;
        this.y += this.dy;
    }

    private handleJumping(): void {
        if (this.y < this.map.getFloor() - this.activeSprite.height) {
            this.dy += 1;
        } else if (this.y > this.map.getFloor() - this.activeSprite.height) {
            this.dy = 0;
            this.y = this.map.getFloor() - this.activeSprite.height;
        }
    }

    private handleOutOfBounds(map: Map): void {
        if (this.x < this.activeSprite.width / 2) {
            this.x = this.activeSprite.width / 2;
        } else if (this.x > map.getWidth() - this.activeSprite.width / 2) {
            this.x = map.getWidth() - this.activeSprite.width / 2;
        }
    }

    private updateSprite(): void {
        this.activeSprite.x = this.x;
        this.activeSprite.y = this.y;
    }

    public update(map: Map): void {
        this.updateTexture();
        this.updateCoordinates();
        this.handleJumping();
        this.handleOutOfBounds(map);
        this.updateSprite();
    }
}
