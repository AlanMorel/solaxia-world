import * as PIXI from "pixi.js-legacy";
import Config from "../config";
import { Scene } from "pixi-scenes";

export default class LoginScene extends Scene {

    private username?: HTMLInputElement;
    private password?: HTMLInputElement;

    public init(): void {
        this.addBackground();
        this.addLogo();
        this.addInputLabels();
        this.addInputs();
        this.addLoginButton();
    }

    private addBackground() {
        const sky = PIXI.Sprite.from("assets/images/sky.png");

        const clouds = PIXI.Sprite.from("assets/images/clouds.png");
        clouds.y = 200;

        const trees = PIXI.Sprite.from("assets/images/trees.png");
        trees.y = Config.height - 415;

        this.addChild(sky);
        this.addChild(clouds);
        this.addChild(trees);
    }

    private addLogo() {
        const richText = new PIXI.Text("Solaxia World", new PIXI.TextStyle({
            fontFamily: "'VCR OSD Mono', Courier, monospace",
            fontSize: "64px",
            fontWeight: "bold",
            fill: 0x000000
        }));
        richText.anchor.set(0.5, 0.5);
        richText.x = Config.width / 2;
        richText.y = 200;

        this.addChild(richText);
    }

    private addInputLabels() {
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
    }

    private addInputs() {
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

    private addLoginButton() {
        const loginLabel = new PIXI.Text("Login", new PIXI.TextStyle({
            fontFamily: "'VCR OSD Mono', Courier, monospace",
            fontSize: "24px",
            fontWeight: "bold",
            fill: 0x000000
        }));
        loginLabel.x = 800;
        loginLabel.y = 480;

        var loginBackground = new PIXI.Graphics();
        loginBackground.beginFill(0x000000, 0.25);
        loginBackground.drawRoundedRect(780, 465, 115, 50, 4);
        
        loginBackground.interactive = true;
        loginBackground.buttonMode = true;
        loginBackground.on("pointerdown", () => {
            const username = this.username?.value;
            const password = this.password?.value;
            this.scenes?.start("gameplay");
        });

        this.addChild(loginBackground);
        this.addChild(loginLabel);
    }

    public stop(): void {
        const canvas = document.querySelector("#game");
        if (canvas) {
            canvas.innerHTML = '';
        }
    }
}
