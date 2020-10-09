import * as PIXI from "pixi.js-legacy";
import Config from "../config";
import { Scene } from "pixi-scenes";

export default class LoginScene extends Scene {

    private username?: HTMLInputElement;
    private password?: HTMLInputElement;

    public init(): void {
        const sky = PIXI.Sprite.from("assets/images/sky.png");

        const clouds = PIXI.Sprite.from("assets/images/clouds.png");
        clouds.y = 200;

        const trees = PIXI.Sprite.from("assets/images/trees.png");
        trees.y = Config.height - 415;

        trees.interactive = true;
        trees.buttonMode = true;
        trees.on("pointerdown", () => {
            this.scenes?.start("gameplay");
        });

        const richText = new PIXI.Text("Solaxia World", new PIXI.TextStyle({
            fontFamily: "'VCR OSD Mono', Courier, monospace",
            fontSize: "64px",
            fontWeight: "bold",
            fill: 0x000000
        }));
        richText.anchor.set(0.5, 0.5);
        richText.x = Config.width / 2;
        richText.y = 200;

        this.addChild(sky);
        this.addChild(clouds);
        this.addChild(trees);

        this.addChild(richText);

        const usernameLabel = new PIXI.Text("Username", new PIXI.TextStyle({
            fontFamily: "'VCR OSD Mono', Courier, monospace",
            fontSize: "32px",
            fontWeight: "bold",
            fill: 0x000000
        }));
        usernameLabel.x = 400;
        usernameLabel.y = 265;

        const passwordLabel = new PIXI.Text("Password", new PIXI.TextStyle({
            fontFamily: "'VCR OSD Mono', Courier, monospace",
            fontSize: "32px",
            fontWeight: "bold",
            fill: 0x000000
        }));
        passwordLabel.x = 400;
        passwordLabel.y = 365;

        this.addChild(usernameLabel);
        this.addChild(passwordLabel);

        this.username = this.createInputField("text", "game__username");
        this.password = this.createInputField("password", "game__password");

        const canvas = document.querySelector("#game");
        canvas?.appendChild(this.username);
        canvas?.appendChild(this.password);
    }

    private createInputField(type: string, className: string): HTMLInputElement {
        const input = document.createElement("input");
        input.setAttribute("type", type);
        input.setAttribute("class", className);
        input.setAttribute("autocomplete", "off");
        return input;
    }

    public stop(): void {
        const canvas = document.querySelector("#game");
        if (canvas) {
            canvas.innerHTML = '';
        }
    }
}
