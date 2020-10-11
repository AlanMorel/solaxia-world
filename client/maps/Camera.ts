import * as PIXI from "pixi.js-legacy";
import Player from "../player/Player";
import Map from "./Map";
import Config from "../config";
import { Scene } from "pixi-scenes";

export default class Camera {

    private mapContainer: PIXI.Container;
    private map: Map;
    private player: Player;

    private x: number;
    private y: number;

    private xLabel: PIXI.Text;
    private yLabel: PIXI.Text;

    constructor(scene: Scene, mapContainer: PIXI.Container, map: Map, player: Player) {
        this.mapContainer = mapContainer;
        this.map = map;
        this.player = player;

        this.x = 0;
        this.y = 0;

        this.xLabel = new PIXI.Text("cx: ", new PIXI.TextStyle({
            fontFamily: "'VCR OSD Mono', Courier, monospace",
            fontSize: "24px",
            fontWeight: "bold",
            fill: 0x000000
        }));
        this.xLabel.x = 5;
        this.xLabel.y = 5;

        this.yLabel = new PIXI.Text("cy: ", new PIXI.TextStyle({
            fontFamily: "'VCR OSD Mono', Courier, monospace",
            fontSize: "24px",
            fontWeight: "bold",
            fill: 0x000000
        }));
        this.yLabel.x = 5;
        this.yLabel.y = 25;

        scene.addChild(this.xLabel);
        scene.addChild(this.yLabel);
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public update(): void {
        this.xLabel.text = "cx: " + this.x;
        this.yLabel.text = "cy: " + this.y;

        if (this.player.getCharacter().getX() > Config.width * 2 / 3 + this.x) {
            this.x += 2;
        } else if (this.player.getCharacter().getX() < Config.width * 1 / 3 + this.x) {
            this.x -= 2;
        }

        if (this.x < 0) {
            this.x = 0;
        } else if (this.x > this.map.getWidth() - Config.width) {
            this.x = this.map.getWidth() - Config.width;
        }

        this.mapContainer.x = -this.x;
    }
}
