import { Sprite, Texture } from "pixi.js-legacy";
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
    [key in AnimationState]: Sprite[];
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

    private activeSprite: Sprite = new Sprite();
    private activeSpriteIndex = 0;
    private lastSpriteChange = Date.now();

    protected speed = 3;
    protected jump = 12;
    protected maxHp = 0;
    protected hp = 0;

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
        this.maxHp = data.hp;
        this.hp = data.hp;

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
            const texture = await ImageLoader.loadAsync(this.path + "/" + state + i + ".png");
            const sprite = Sprite.from(texture);
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

    public getHP(): number {
        return this.hp;
    }

    public getMaxHP(): number {
        return this.maxHp;
    }

    public getSprite(): Sprite {
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
        this.switchTexture(sprites[this.activeSpriteIndex].texture);
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
        this.lastSpriteChange = now;
        this.activeSpriteIndex = ++this.activeSpriteIndex % sprites.length;
        this.switchTexture(sprites[this.activeSpriteIndex].texture);
    }

    private switchTexture(texture: Texture): void {
        const oldHeight = this.activeSprite.height;
        this.activeSprite.texture = texture;
        this.y += oldHeight - this.activeSprite.height;
    }

    private updateCoordinates(): void {
        this.x += this.dx;
        this.y += this.dy;
    }

    private handleJumping(): void {
        const floor = this.map.getFloor() - this.activeSprite.height;
        if (this.y < floor) {
            this.dy += 1;
        } else if (this.y > floor) {
            this.dy = 0;
            this.y = floor;

            if (this.dx < 0) {
                this.moveLeft();
            } else if (this.dx > 0) {
                this.moveRight();
            }
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
