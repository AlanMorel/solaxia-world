import KeyListener from "../utility/KeyListener";
import Map from "../maps/Map";
import Game from "../utility/Game";
import Character from "./Character";
import Star from "../projectiles/Star";
import UserInterface from "../ui/UserInterface";
import { Scene } from "pixi-scenes";

export default class Player {

    private character?: Character;
    private username: string;
    private ui?: UserInterface;
    private leftKey: KeyListener = new KeyListener("ArrowLeft");
    private rightKey: KeyListener = new KeyListener("ArrowRight");
    private upKey: KeyListener = new KeyListener("ArrowUp");
    private spaceKey: KeyListener = new KeyListener("Space");
    private attackKey: KeyListener = new KeyListener("KeyX");

    constructor(game: Game) {
        this.setUpLeftKey();
        this.setUpRightKey();
        this.setUpUpKey();
        this.setUpSpaceKey();
        this.setUpAttackKey();
        this.username = game.getUsername();
    }

    public async init(map: Map): Promise<void> {
        this.character = new Character(map, this.username);
        await this.character.init();
        map.addCharacter(this.character);
    }

    private setUpLeftKey(): void {
        this.leftKey.onDown(() => {
            this.character?.moveLeft();
        }).onUp(() => {
            if (this.rightKey?.isDown()) {
                this.character?.moveRight();
            } else {
                this.character?.stop();
            }
        });
    }

    private setUpRightKey(): void {
        this.rightKey.onDown(() => {
            this.character?.moveRight();
        }).onUp(() => {
            if (this.leftKey?.isDown()) {
                this.character?.moveLeft();
            } else {
                this.character?.stop();
            }
        });
    }

    private setUpUpKey(): void {
        this.upKey.onDown(() => {
            this.usePortal();
        });
    }

    private setUpSpaceKey(): void {
        this.spaceKey.onDown(() => {
            this.character?.jumpUp();
        });
    }

    private async setUpAttackKey(): Promise<void> {
        this.attackKey.onDown(async () => {
            await this.attack();
        });
    }

    public chatboxFocus(): void {
        this.leftKey.pause();
        this.rightKey.pause();
        this.spaceKey.pause();
    }

    public chatboxBlur(): void {
        this.leftKey.resume();
        this.rightKey.resume();
        this.spaceKey.resume();
    }

    public getCharacter(): Character | undefined {
        return this.character;
    }

    private async attack(): Promise<void> {
        if (this.character) {
            const projectile = new Star(this.character);
            await projectile.init();
            this.character.getMap().addProjectile(projectile);
        }
    }

    public renderUI(scene: Scene): void {
        this.ui = new UserInterface(scene, this);
    }

    public update(): void {
        this.ui?.update();
    }

    private usePortal(): void {
        if (!this.character) {
            return;
        }
        const threshold = 50;
        for (const portal of this.character.getMap().getPortals()) {
            if (Math.abs(this.character.getX() - portal.getX()) > threshold) {
                continue;
            }
            if (Math.abs(this.character.getY() - (portal.getY() + 150)) > threshold) {
                continue;
            }
            this.character.getMap().usePortal(this.character, portal);
            return;
        }
    }
}
