import { Scene } from "pixi-scenes";
import KeyListener from "../utility/KeyListener";
import Map from "../maps/Map";
import Game from "../utility/Game";
import Character from "./Character";

export default class Player {

    private character: Character;
    private leftKey: KeyListener = new KeyListener("ArrowLeft");
    private rightKey: KeyListener = new KeyListener("ArrowRight");
    private spaceKey: KeyListener = new KeyListener("Space");

    constructor(game: Game, scene: Scene, map: Map) {
        this.character = new Character(scene, map, game.getUsername());
        this.setUpLeftKey();
        this.setUpRightKey();
        this.setUpSpaceKey();
    }

    private setUpLeftKey(): void {
        this.leftKey.onDown(() => {
            this.character.moveLeft();
        }).onUp(() => {
            if (this.rightKey?.isDown()) {
                this.character.moveRight();
            } else {
                this.character.stop();
            }
        });
    }

    private setUpRightKey(): void {
        this.rightKey.onDown(() => {
            this.character.moveRight();
        }).onUp(() => {
            if (this.leftKey?.isDown()) {
                this.character.moveLeft();
            } else {
                this.character.stop();
            }
        });
    }

    private setUpSpaceKey(): void {
        this.spaceKey.onDown(() => {
            this.character.jump();
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

    public update(): void {
        this.character.updateCharacter();
    }
}
