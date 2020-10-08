import * as PIXI from "pixi.js-legacy";
import { Scene } from "pixi-scenes";
import Config from "../config";
import KeyListener from "./KeyListener";

export default class Player {

    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    init() {
        const player = PIXI.Sprite.from("assets/images/player/0.png");
        player.y = Config.height - 150;
        this.scene.addChild(player);

        this.setUpControls();
    }

    setUpControls() {
        const leftKeyListener = new KeyListener("ArrowLeft");
        leftKeyListener.setPress(() => {
            console.log("left pressed");
        }).setRelease(() => {
            console.log("left released");
        });

        const rightKeyListener = new KeyListener("ArrowRight");
        rightKeyListener.setPress(() => {
            console.log("right pressed");
        }).setRelease(() => {
            console.log("right released");
        });
    }
}
