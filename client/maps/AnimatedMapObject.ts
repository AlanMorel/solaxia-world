import * as PIXI from "pixi.js-legacy";
import Map from "../maps/Map";
import ImageLoader from "../loaders/ImageLoader";
import MapObject from "./MapObject";
import MapObjectLoader, { MapObjectData } from "../loaders/MapObjectLoader";

enum AnimationState {
    STANDING = "standing",
    WALKING = "walking",
    JUMPING = "jumping"
}

type spritesInterface = {
    [key in AnimationState]: PIXI.Sprite[];
};

type spritesIntervalInterface = {
    [key in AnimationState]: number;
};

export default class AnimatedMapObject extends MapObject {

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

    constructor(map: Map, path: string) {
        super(map);

        this.map = map;
        this.path = path;
    }

    public async init(): Promise<void> {
        const data: MapObjectData = await MapObjectLoader.loadObject(this.path);

        this.speed = data.speed;
        this.jump = data.jump;

        await this.loadSprites(data);
        this.map.getContainer().addChild(this.activeSprite);
    }

    private async loadSprites(data: MapObjectData): Promise<void> {
        await this.loadStateSprites(AnimationState.STANDING, data);
        await this.loadStateSprites(AnimationState.WALKING, data);
        await this.loadStateSprites(AnimationState.JUMPING, data);

        this.updateActiveSprite();
    }

    private async loadStateSprites(state: AnimationState, data: MapObjectData): Promise<void> {
        if (!data[state]) {
            return;
        }

        for (let i = 0; i < data[state].frames; i++) {
            const texture = await ImageLoader.loadAsync("/assets/images/" + this.path + "/" + state + i + ".png");
            const sprite = PIXI.Sprite.from(texture);
            sprite.anchor.set(0.5, 0);
            this.sprites[state].push(sprite);
        }

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
        const sprites = this.sprites[this.animationState];
        if (!sprites.length) {
            return;
        }
        this.animationState = animationState;
        this.activeSpriteIndex = 0;
        this.lastSpriteChange =  Date.now();
        this.activeSprite.texture = sprites[this.activeSpriteIndex].texture;
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

    private handleOutOfBounds(): void {
        if (this.x < this.activeSprite.width / 2) {
            this.x = this.activeSprite.width / 2;
        } else if (this.x > this.map.getWidth() - this.activeSprite.width / 2) {
            this.x = this.map.getWidth() - this.activeSprite.width / 2;
        }
    }

    private updateSprite(): void {
        this.activeSprite.x = this.x;
        this.activeSprite.y = this.y;
    }

    public update(): void {
        this.updateTexture();
        this.updateCoordinates();
        this.handleJumping();
        this.handleOutOfBounds();
        this.updateSprite();
    }
}
