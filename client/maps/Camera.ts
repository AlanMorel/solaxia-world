import * as PIXI from "pixi.js-legacy";
import Player from "../player/Player";
import Map from "./Map";
import Config from "../config";
import { Scene } from "pixi-scenes";

export default class Camera {

    private map: Map;
    private player: Player;

    private targetX = 0;
    private targetY = 0;
    private x = 0;
    private y = 0;

    private xLabel: PIXI.Text;
    private yLabel: PIXI.Text;
    private playerLabel: PIXI.Text;

    constructor(scene: Scene, map: Map, player: Player) {
        this.map = map;
        this.player = player;

        this.xLabel = new PIXI.Text("", new PIXI.TextStyle({
            fontFamily: "'VCR OSD Mono', Courier, monospace",
            fontSize: "24px"
        }));
        this.xLabel.x = 5;
        this.xLabel.y = 5;

        this.yLabel = new PIXI.Text("", new PIXI.TextStyle({
            fontFamily: "'VCR OSD Mono', Courier, monospace",
            fontSize: "24px"
        }));
        this.yLabel.x = 5;
        this.yLabel.y = 30;

        this.playerLabel = new PIXI.Text("", new PIXI.TextStyle({
            fontFamily: "'VCR OSD Mono', Courier, monospace",
            fontSize: "24px"
        }));
        this.playerLabel.x = 5;
        this.playerLabel.y = 55;

        scene.addChild(this.xLabel);
        scene.addChild(this.yLabel);
        scene.addChild(this.playerLabel);
    }

    private updateLabels(): void {
        this.xLabel.text = "x: " + this.x + " tx: " + this.targetX;
        this.yLabel.text = "y: " + this.y + " ty: " + this.targetY;
        this.playerLabel.text = "px: " + this.player.getX() + " py: " + this.player.getY();
    }

    private updateTargets(): void {
        if (this.player.getX() > Config.width * 2 / 3 + this.x) {
            this.targetX = this.player.getX() - Config.width * 2 / 3;
        } else if (this.player.getX() < Config.width * 1 / 3 + this.x) {
            this.targetX = this.player.getX() - Config.width * 1 / 3;
        }
        if (this.player.getY() < Config.height * 1 / 3 + this.y) {
            this.targetY = (this.player.getY() - Config.height * 1 / 3);
        } else if (this.player.getY() > Config.height * 2 / 3 + this.y) {
            this.targetY = this.player.getY() - Config.height * 2 / 3;
        }
    }

    private constrainTargets(): void {
        if (this.targetX < 0) {
            this.targetX = 0;
        } else if (this.targetX > this.map.getWidth() - Config.width) {
            this.targetX = this.map.getWidth() - Config.width;
        }
        if (this.targetY < 0) {
            this.targetY = 0;
        } else if (this.targetY > this.map.getHeight() - Config.height) {
            this.targetY = this.map.getHeight() - Config.height;
        }
    }

    private updateCoordinates(): void {
        this.x += (this.targetX - this.x) * 1 / 50;
        this.y += (this.targetY - this.y) * 1 / 25;
    }

    private updateMapContainer(): void {
        this.map.getContainer().x = -this.x;
        this.map.getContainer().y = -this.y;
    }

    public update(): void {
        this.updateLabels();

        this.updateTargets();
        this.constrainTargets();

        this.updateCoordinates();
        this.updateMapContainer();
    }
}
