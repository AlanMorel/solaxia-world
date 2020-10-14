import * as PIXI from "pixi.js-legacy";
import Map from "../maps/Map";
import ImageLoader from "../utility/ImageLoader";
import { AnimationState } from "./AnimationState";
import MapObject from "./MapObject";

type spritesInterface = {
    [key in AnimationState]: PIXI.Sprite[];
};

type spritesIntervalInterface = {
    [key in AnimationState]: number;
};

interface AnimatedMapObjectData {
    name?: string,
    speed: number,
    jump: number,
    standing: {
        frames: number,
        interval: number
    },
    walking: {
        frames: number,
        interval: number
    },
    jumping: {
        frames: number,
        interval: number
    }
}

export default class AnimatedMapObject extends MapObject {

    protected map: Map;

    private sprites: spritesInterface = {
        [AnimationState.STANDING]: [],
        [AnimationState.WALKING]: [],
        [AnimationState.JUMPING]: []
    };

    private spritesInterval: spritesIntervalInterface = {
        [AnimationState.STANDING]: 0,
        [AnimationState.WALKING]: 0,
        [AnimationState.JUMPING]: 0
    };

    private animationState: AnimationState = AnimationState.STANDING;

    private activeSprite: PIXI.Sprite = new PIXI.Sprite();
    private activeSpriteIndex = 0;
    private lastSpriteChange = Date.now();

    protected speed = 3;
    protected jump = 12;

    private dx = 0;
    private dy = 0;

    private path: string;

    constructor(scene: PIXI.Container, map: Map, path: string) {
        super();

        this.map = map;
        this.path = path;

        scene.addChild(this.activeSprite);
    }

    public async init(): Promise<void> {
        const response = await fetch("/assets/data/" + this.path + ".json");
        const data: AnimatedMapObjectData = await response.json();

        this.speed = data.speed;
        this.jump = data.jump;

        await this.loadSprites(data);
    }

    private async loadSprites(data: AnimatedMapObjectData): Promise<void> {
        if (data.standing) {
            await this.loadStateSprites(AnimationState.STANDING, data);
        }
        if (data.walking) {
            await this.loadStateSprites(AnimationState.WALKING, data);
        }
        if (data.jumping) {
            await this.loadStateSprites(AnimationState.JUMPING, data);
        }

        this.updateActiveSprite();
    }

    private async loadStateSprites(state: AnimationState, data: AnimatedMapObjectData): Promise<void> {
        const sprites: PIXI.Sprite[] = [];

        for (let i = 0; i < data[state].frames; i++) {
            const texture = await ImageLoader.loadAsync("/assets/images/" + this.path + "/" + state + i + ".png");
            const sprite = PIXI.Sprite.from(texture);
            sprite.anchor.set(0.5, 0);
            sprites.push(sprite);
        }

        this.sprites[state] = sprites;
        this.spritesInterval[state] = data[state].interval;
    }

    private updateActiveSprite(): void {
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

    public jumpUp(): void {
        this.dy = -this.jump;
        this.updateAnimationState(AnimationState.JUMPING);
    }

    public jumpLeft(): void {
        this.lookLeft();
        this.dx = -this.speed;
        this.jumpUp();
    }

    public jumpRight(): void {
        this.lookRight();
        this.dx = this.speed;
        this.jumpUp();
    }

    private updateAnimationState(animationState: AnimationState): void {
        this.animationState = animationState;
        this.activeSpriteIndex = 0;
        this.lastSpriteChange =  Date.now();
        this.activeSprite.texture = this.sprites[this.animationState][this.activeSpriteIndex].texture;
    }

    private updateTexture(): void {
        const now = Date.now();
        if (now - this.lastSpriteChange < this.spritesInterval[this.animationState]) {
            return;
        }
        const sprites = this.sprites[this.animationState];
        if (!sprites.length) {
            return;
        }
        const nextSpriteIndex = ++this.activeSpriteIndex % sprites.length;
        this.activeSprite.texture = sprites[nextSpriteIndex].texture;
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
