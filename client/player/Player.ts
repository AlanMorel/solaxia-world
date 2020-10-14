import KeyListener from "../utility/KeyListener";
import Map from "../maps/Map";
import Game from "../utility/Game";
import Character from "./Character";

export default class Player {

    private leftKey: KeyListener = new KeyListener("ArrowLeft");
    private rightKey: KeyListener = new KeyListener("ArrowRight");
    private upKey: KeyListener = new KeyListener("ArrowUp");
    private spaceKey: KeyListener = new KeyListener("Space");

    private character?: Character;
    private username: string;

    constructor(game: Game) {
        this.setUpLeftKey();
        this.setUpRightKey();
        this.setUpUpKey();
        this.setUpSpaceKey();
        this.username = game.getUsername();
    }

    public async init(map: Map): Promise<void> {
        this.character = new Character(map, this.username);
        await this.character.init();
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

    private usePortal(): void {
        if (!this.character) {
            return;
        }
        for (const portal of this.character.getMap().getPortals()) {
            if (Math.abs(this.character.getX() - portal.getX()) > 50) {
                continue;
            }
            if (Math.abs(this.character.getY() - (portal.getY() + 150)) > 50) {
                continue;
            }
            this.character.getMap().usePortal(this.character, portal);
            return;
        }
    }
}
