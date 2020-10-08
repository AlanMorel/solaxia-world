import * as PIXI from "pixi.js-legacy";
import { Scene } from "pixi-scenes";
import Config from "../config";
import KeyListener from "./KeyListener";

export default class Player {

    private scene: Scene;
    private sprite: PIXI.Sprite;
    private leftKey?: KeyListener;
    private rightKey?: KeyListener;

    constructor(scene: Scene) {
        this.scene = scene;
        this.sprite = PIXI.Sprite.from("assets/images/player/0.png");
        this.sprite.y = Config.height - 150;
        this.scene.addChild(this.sprite);
        this.setUpControls();
    }

    setUpControls() {
        this.leftKey = new KeyListener("ArrowLeft");
        this.rightKey = new KeyListener("ArrowRight");
    }

    update() {
        if (this.leftKey?.isDown()) {
            this.sprite.x -= 1;
        }
        if (this.rightKey?.isDown()) {
            this.sprite.x += 1;
        }
    }
}
