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
    protected jumpStrength = 12;

    private dx = 0;
    private dy = 0;

    private loaded = false;

    constructor(scene: PIXI.Container, map: Map, path: string) {
        super();

        this.map = map;
        
        this.activeSprite = new PIXI.Sprite();
        scene.addChild(this.activeSprite);

        this.loadData(path);
    }

    private async loadData(path: string): Promise<void> {
        const response = await fetch("/assets/data/" + path + ".json");
        const data = await response.json();

        this.speed = data.speed;
        this.jumpStrength = data.jump;

        this.loadSprites(data, path);

        this.loaded = true;
    }

    private loadSprites(data: any, path: string) {
        if (data.standing) {
            this.loadStateSprites(path, "standing", data.standing, AnimationState.STANDING);
        }
        if (data.walking) {
            this.loadStateSprites(path, "walking", data.walking, AnimationState.WALKING);
        }
        this.updateActiveSprite();
    }

    private loadStateSprites(path: string, name: string, number: number, state: AnimationState) {
        const sprites: PIXI.Sprite[] = [];

        for (let i = 0; i < number; i++) {
            const texture = PIXI.Texture.from("/assets/images/" + path + "/" + name + i + ".png");
            const sprite = PIXI.Sprite.from(texture);
            sprite.anchor.set(0.5, 0);
            sprites.push(sprite);
        }

        this.sprites[state] = sprites;
    }

    private updateActiveSprite() {
        this.activeSprite.anchor.set(0.5, 0);
        this.activeSprite.scale.x = -1;
        this.activeSprite.texture = this.sprites[AnimationState.STANDING][0].texture;
        this.activeSprite.texture.addListener("update", () => {
            this.x = this.activeSprite.texture.width / 2;
        });
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
        this.dy = -this.jumpStrength;
    }

    private updateAnimationState(animationState: AnimationState): void {
        if (!this.loaded) {
            return;
        }
        this.animationState = animationState;
        this.activeSpriteIndex = 0;
        this.lastSpriteChange =  Date.now();
        this.activeSprite.texture = this.sprites[this.animationState][this.activeSpriteIndex].texture;
    }

    private updateTexture(): void {
        if (!this.loaded) {
            return;
        }
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
