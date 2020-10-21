import { Sprite, Texture } from "pixi.js-legacy";
import Map from "../maps/Map";
import ImageLoader from "../loaders/ImageLoader";
import MapObject from "./MapObject";
import { SpriteData } from "../loaders/MapObjectLoader";

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

    private spriteIndex = 0;
    private lastSpriteUpdate = Date.now();

    protected speed = 0;
    protected jump = 0;

    private dx = 0;
    private dy = 0;

    protected path: string;

    constructor(map: Map, path: string) {
        super(map);

        this.path = path;

        this.sprite.anchor.set(0.5, 0);
        this.sprite.scale.x = -1;
        this.sprite.texture.addListener("update", () => {
            this.x = this.sprite.texture.width / 2;
        });
    }

    public async init(data: SpriteData): Promise<void> {
        await this.loadSprites(AnimationState.STANDING, data);
        await this.loadSprites(AnimationState.WALKING, data);
        await this.loadSprites(AnimationState.JUMPING, data);

        this.sprite.texture = this.sprites[AnimationState.STANDING][0].texture;
        super.addChild();
    }

    private async loadSprites(state: AnimationState, data: SpriteData): Promise<void> {
        if (!data[state]) {
            return;
        }

        for (let i = 0; i < data[state].frames; i++) {
            const texture = await ImageLoader.loadAsync(this.path + "/" + state + i);
            const sprite = Sprite.from(texture);
            this.sprites[state].push(sprite);
        }

        this.spritesInterval[state] = data[state].interval;
    }

    public moveLeft(): void {
        this.lookLeft();
        this.dx = -this.speed;
        this.updateState(AnimationState.WALKING);
    }

    public moveRight(): void {
        this.lookRight();
        this.dx = this.speed;
        this.updateState(AnimationState.WALKING);
    }

    public lookLeft(): void {
        this.sprite.scale.x = 1;
    }

    public lookRight(): void {
        this.sprite.scale.x = -1;
    }

    public isLookingLeft(): boolean {
        return this.sprite.scale.x === 1;
    }

    public isLookingRight(): boolean {
        return this.sprite.scale.x === -1;
    }

    public stop(): void {
        this.dx = 0;
        this.updateState(AnimationState.STANDING);
    }

    public jumpUp(): void {
        this.dy = -this.jump;
        this.updateState(AnimationState.JUMPING);
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

    private updateState(state: AnimationState): void {
        const sprites = this.sprites[this.animationState];
        if (!sprites.length) {
            return;
        }
        this.animationState = state;
        this.spriteIndex = 0;
        this.lastSpriteUpdate =  Date.now();
        this.switchTexture(sprites[this.spriteIndex].texture);
    }

    private updateTexture(): void {
        const now = Date.now();
        if (now - this.lastSpriteUpdate < this.spritesInterval[this.animationState]) {
            return;
        }
        const sprites = this.sprites[this.animationState];
        if (!sprites.length) {
            return;
        }
        this.lastSpriteUpdate = now;
        this.spriteIndex = ++this.spriteIndex % sprites.length;
        this.switchTexture(sprites[this.spriteIndex].texture);
    }

    private switchTexture(texture: Texture): void {
        const oldHeight = this.sprite.height;
        this.sprite.texture = texture;
        this.y += oldHeight - this.sprite.height;
    }

    private updateCoordinates(): void {
        this.x += this.dx;
        this.y += this.dy;
    }

    private handleJumping(): void {
        const floor = this.map.getFloor() - this.sprite.height;
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
        if (this.x < this.sprite.width / 2) {
            this.x = this.sprite.width / 2;
        } else if (this.x > this.map.getWidth() - this.sprite.width / 2) {
            this.x = this.map.getWidth() - this.sprite.width / 2;
        }
    }

    private updateSprite(): void {
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }

    public update(): void {
        this.updateTexture();
        this.updateCoordinates();
        this.handleJumping();
        this.handleOutOfBounds();
        this.updateSprite();
    }
}
