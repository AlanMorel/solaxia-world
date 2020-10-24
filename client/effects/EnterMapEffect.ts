import { Graphics, Text, TextStyle } from "pixi.js-legacy";
import Map from "../maps/Map";
import Effect from "./Effect";
import Config from "../config";

export default class EnterMapEffect extends Effect {

    private textLabel: Text;
    private textBackground: Graphics;
    private x = 0;
    private y = 300;

    constructor(map: Map) {
        super(map);

        this.textBackground = new Graphics();
        this.textBackground.beginFill(0x000000, 0.25);
        this.textBackground.drawRect(0, 0, Config.width, 50);

        const textStyle = new TextStyle({
            fontFamily: "'VCR OSD Mono', Courier, monospace",
            fontSize: "24px",
            fill: 0xFFFFFF
        });

        this.textLabel = new Text("", textStyle);
        this.textLabel.text = map.getName();

        this.container.addChild(this.textBackground);
        this.container.addChild(this.textLabel);

        this.x = Config.width / 2 - this.textLabel.width / 2;
        this.y = 300;
    }

    public update(): void {
        const camera = this.map.getCamera();
        if (camera) {
            this.textBackground.x = camera.getX();
            this.textBackground.y = 285 + camera.getY();

            this.textLabel.x = this.x + camera.getX();
            this.textLabel.y = this.y + camera.getY();
        }

        const elapsed = this.getElapsedSeconds();
        if (elapsed < 1) {
            this.container.alpha = elapsed;
        } else if (elapsed < 5) {
            // do nothing
        } else if (elapsed < 5 + 1) {
            this.container.alpha = 1 - (elapsed - 5);
        } else {
            this.map.removeEffect(this);
        }
    }
}
