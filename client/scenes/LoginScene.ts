import * as PIXI from "pixi.js-legacy";
import Config from "../config";
import Game from "../utility/Game";
import GameScene from "../utility/GameScene";
import DOMHandler from "../utility/DOMHandler";

export default class LoginScene extends GameScene {

    private username?: HTMLInputElement;
    private password?: HTMLInputElement;

    constructor(game: Game) {
        super(game);
    }

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
        this.username = DOMHandler.createInputField("text", "game__username");
        this.password = DOMHandler.createInputField("password", "game__password");

        DOMHandler.add(this.username);
        DOMHandler.add(this.password);
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

        const loginBackground = new PIXI.Graphics();
        loginBackground.beginFill(0x000000, 0.25);
        loginBackground.drawRoundedRect(780, 465, 115, 50, 4);
        loginBackground.interactive = true;
        loginBackground.buttonMode = true;
        loginBackground.on("pointerdown", () => {
            this.login();
        });

        this.addChild(loginBackground);
        this.addChild(loginLabel);
    }

    private login() {
        const username = this.username?.value;
        const password = this.password?.value;

        if (username) {
            this.game.setUsername(username);
        }
        this.scenes?.start("gameplay");
    }

    public stop(): void {
        DOMHandler.clearCanvas();
    }
}
