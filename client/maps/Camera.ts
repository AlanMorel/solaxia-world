import { Text, TextStyle }from "pixi.js-legacy";
import Map from "./Map";
import Config from "../config";
import { Scene } from "pixi-scenes";
import Character from "../player/Character";
import Container from "../utility/Container";

export default class Camera extends Container {

    private map: Map;
    private character?: Character;

    private targetX = 0;
    private targetY = 0;
    private x = 0;
    private y = 0;

    private xLabel: Text;
    private yLabel: Text;
    private playerLabel: Text;

    private readonly rate = 25;

    constructor(scene: Scene, map: Map, character: Character | undefined) {
        super(scene);

        this.map = map;
        this.character = character;

        const textStyle = new TextStyle({
            fontFamily: "'VCR OSD Mono', Courier, monospace",
            fontSize: "24px"
        });

        this.xLabel = new Text("", textStyle);
        this.xLabel.x = 5;
        this.xLabel.y = 5;

        this.yLabel = new Text("", textStyle);
        this.yLabel.x = 5;
        this.yLabel.y = 30;

        this.playerLabel = new Text("", textStyle);
        this.playerLabel.x = 5;
        this.playerLabel.y = 55;

        this.container.addChild(this.xLabel);
        this.container.addChild(this.yLabel);
        this.container.addChild(this.playerLabel);
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    private updateLabels(): void {
        if (!this.character) {
            return;
        }
        this.xLabel.text = "x: " + this.x + " tx: " + this.targetX;
        this.yLabel.text = "y: " + this.y + " ty: " + this.targetY;
        this.playerLabel.text = "px: " + this.character.getX() + " py: " + this.character.getY();
    }

    private updateTargets(): void {
        if (!this.character) {
            return;
        }
        if (this.character.getX() > Config.width * 2 / 3 + this.x) {
            this.targetX = this.character.getX() - Config.width * 2 / 3;
        } else if (this.character.getX() < Config.width * 1 / 3 + this.x) {
            this.targetX = this.character.getX() - Config.width * 1 / 3;
        }
        if (this.character.getY() < Config.height * 1 / 3 + this.y) {
            this.targetY = (this.character.getY() - Config.height * 1 / 3);
        } else if (this.character.getY() > Config.height * 2 / 3 + this.y) {
            this.targetY = this.character.getY() - Config.height * 2 / 3;
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
        this.x += (this.targetX - this.x) / this.rate;
        this.y += (this.targetY - this.y) / this.rate;
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
