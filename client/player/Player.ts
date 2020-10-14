import KeyListener from "../utility/KeyListener";
import Map from "../maps/Map";
import Game from "../utility/Game";
import Character from "./Character";

export default class Player extends Character {

    private leftKey: KeyListener = new KeyListener("ArrowLeft");
    private rightKey: KeyListener = new KeyListener("ArrowRight");
    private spaceKey: KeyListener = new KeyListener("Space");

    constructor(game: Game, map: Map) {
        super(map.getContainer(), map, game.getUsername());
        this.setUpLeftKey();
        this.setUpRightKey();
        this.setUpSpaceKey();
    }

    private setUpLeftKey(): void {
        this.leftKey.onDown(() => {
            this.moveLeft();
        }).onUp(() => {
            if (this.rightKey?.isDown()) {
                this.moveRight();
            } else {
                this.stop();
            }
        });
    }

    private setUpRightKey(): void {
        this.rightKey.onDown(() => {
            this.moveRight();
        }).onUp(() => {
            if (this.leftKey?.isDown()) {
                this.moveLeft();
            } else {
                this.stop();
            }
        });
    }

    private setUpSpaceKey(): void {
        this.spaceKey.onDown(() => {
            this.jumpUp();
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
}
