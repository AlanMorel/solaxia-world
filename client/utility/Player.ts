import * as PIXI from "pixi.js-legacy";
import { Scene } from "pixi-scenes";
import Config from "../config";

export default class Player {

    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    init() {
        const player = PIXI.Sprite.from("assets/images/player/0.png");
        player.y = Config.height - 150;
        this.scene.addChild(player);
    }
}