import * as PIXI from "pixi.js-legacy";
import { Scene } from "pixi-scenes";
import Config from "../config";
import KeyListener from "./KeyListener";
import Map from "../maps/Map";

export default class Player {

    private scene: Scene;
    private map: Map;
    private sprite: PIXI.Sprite;
    private leftKey?: KeyListener;
    private rightKey?: KeyListener;

    constructor(scene: Scene, map: Map) {
        this.scene = scene;
        this.map = map;
        const texture = PIXI.Texture.from("assets/images/player/0.png");
        this.sprite = PIXI.Sprite.from(texture);
        this.sprite.anchor.set(0.5, 0);
        this.sprite.y = Config.height - 150;
        this.scene.addChild(this.sprite);
        texture.addListener("update", () => {
            this.sprite.x = texture.width / 2;
        });
        this.setUpControls();
    }

    setUpControls() {
        this.leftKey = new KeyListener("ArrowLeft");
        this.leftKey.setPress(() => {
            if (!this.rightKey?.isDown()) {
                this.sprite.scale.x = -1; 
            }
        }).setRelease(() => {
            if (this.rightKey?.isDown()) {
                this.sprite.scale.x = 1; 
            }
        });
        this.rightKey = new KeyListener("ArrowRight");
        this.rightKey.setPress(() => {
            if (!this.leftKey?.isDown()) {
                this.sprite.scale.x = 1; 
            }
        }).setRelease(() => {
            if (this.leftKey?.isDown()) {
                this.sprite.scale.x = -1; 
            }
        });
    }

    update() {
        if (this.leftKey?.isDown()) {
            this.sprite.x -= 1;
        }
        if (this.rightKey?.isDown()) {
            this.sprite.x += 1;
        }
        if (this.sprite.x < this.sprite.width / 2) {
            this.sprite.x = this.sprite.width / 2;
        } else if (this.sprite.x > this.map.getWidth() - this.sprite.width / 2) {
            this.sprite.x = this.map.getWidth() - this.sprite.width / 2;
        }
    }
}
