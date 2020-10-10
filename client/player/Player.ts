import { Scene } from "pixi-scenes";
import KeyListener from "../utility/KeyListener";
import Map from "../maps/Map";
import NameTag from "./NameTag";
import Game from "../utility/Game";
import AnimatedMapObject from "../maps/AnimatedMapObject";

export default class Player {

    private game: Game;
    private scene: Scene;
    private map: Map;
    private animator: AnimatedMapObject;
    private nameTag: NameTag;
    private leftKey: KeyListener = new KeyListener("ArrowLeft");
    private rightKey: KeyListener = new KeyListener("ArrowRight");
    private spaceKey: KeyListener = new KeyListener("Space");

    constructor(game: Game, scene: Scene, map: Map) {
        this.game = game;
        this.scene = scene;
        this.map = map;
        this.animator = new AnimatedMapObject(this.scene, "assets/images/player/", 1, 5);
        this.nameTag = new NameTag(this.scene, this.game.getUsername());

        this.setUpControls();
    }

    private setUpControls() {
        this.leftKey.onDown(() => {
            if (!this.rightKey?.isDown()) {
                this.animator.moveLeft();
            }
        }).onUp(() => {
            if (this.rightKey?.isDown()) {
                this.animator.moveRight();
            } else {
                this.animator.stop();
            }
        });
        this.rightKey.onDown(() => {
            if (!this.leftKey?.isDown()) {
                this.animator.moveRight();
            }
        }).onUp(() => {
            if (this.leftKey?.isDown()) {
                this.animator.moveLeft();
            } else {
                this.animator.stop();
            }
        });
        this.spaceKey.onDown(() => {
            this.animator.jump();
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
        this.animator.update(this.map);
        this.nameTag.update(this.animator.getSprite());
    }
}
