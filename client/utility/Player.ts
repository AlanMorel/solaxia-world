import * as PIXI from "pixi.js-legacy";
import { Scene } from "pixi-scenes";
import Config from "../config";
import KeyListener from "./KeyListener";
import Map from "../maps/Map";

export default class Player {

    private scene: Scene;
    private map: Map;
    private sprite: PIXI.Sprite;
    private speed: number;
    private dx: number;
    private dy: number;
    private nameTag: PIXI.Sprite;
    private leftKey?: KeyListener;
    private rightKey?: KeyListener;
    private spaceKey?: KeyListener;

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

        this.nameTag = new PIXI.Text("Alan", {
            fontFamily : "Arial", 
            fontSize: 14,
            fill : 0x00000
        });
        this.nameTag.anchor.set(0.5, 0);
        
        this.scene.addChild(this.nameTag);

        this.setUpControls();
        this.speed = 3;
        this.dx = 0;
        this.dy = 0;
    }

    setUpControls() {
        this.leftKey = new KeyListener("ArrowLeft");
        this.leftKey.setPress(() => {
            if (!this.rightKey?.isDown()) {
                this.sprite.scale.x = -1; 
                this.dx = -this.speed;
            }
        }).setRelease(() => {
            if (this.rightKey?.isDown()) {
                this.sprite.scale.x = 1; 
                this.dx = this.speed;
            } else {   
                this.dx = 0;
            }
        });
        this.rightKey = new KeyListener("ArrowRight");
        this.rightKey.setPress(() => {
            if (!this.leftKey?.isDown()) {
                this.sprite.scale.x = 1; 
                this.dx = this.speed;
            }
        }).setRelease(() => {
            if (this.leftKey?.isDown()) {
                this.sprite.scale.x = -1; 
                this.dx = -this.speed;
            } else {
                this.dx = 0;
            }
        });
        this.spaceKey = new KeyListener("Space");
        this.spaceKey.setPress(() => {
            this.jump();
        });
    }

    jump() {
        this.dy = -10;
    }

    update() {
        this.sprite.x += this.dx;
        this.sprite.y += this.dy;
        if (this.sprite.y < Config.height - 150) {
            this.dy += 1;
        } else {
            this.sprite.y = Config.height - 150;
            this.dy = 0;
        }
        if (this.sprite.x < this.sprite.width / 2) {
            this.sprite.x = this.sprite.width / 2;
        } else if (this.sprite.x > this.map.getWidth() - this.sprite.width / 2) {
            this.sprite.x = this.map.getWidth() - this.sprite.width / 2;
        }

        this.nameTag.x = this.sprite.x;
        this.nameTag.y = this.sprite.y + this.sprite.height + 10;
    }
}
