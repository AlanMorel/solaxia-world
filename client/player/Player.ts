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
        this.setUpControls();
    }

    private setUpControls() {
        this.leftKey.onDown(() => {
            if (!this.rightKey?.isDown()) {
                this.character.moveLeft();
            }
        }).onUp(() => {
            if (this.rightKey?.isDown()) {
                this.character.moveRight();
            } else {
                this.character.stop();
            }
        });
        this.rightKey.onDown(() => {
            if (!this.leftKey?.isDown()) {
                this.character.moveRight();
            }
        }).onUp(() => {
            if (this.leftKey?.isDown()) {
                this.character.moveLeft();
            } else {
                this.character.stop();
            }
        });
        this.spaceKey.onDown(() => {
            this.character.jump();
        });
    }

    public chatboxFocus() {
        this.leftKey.pause();
        this.rightKey.pause();
        this.spaceKey.pause();
    }
    
    public chatboxBlur() {
        this.leftKey.resume();
        this.rightKey.resume();
        this.spaceKey.resume();
    }

    public update() {
        this.character.updateCharacter();
    }
}
