import { Sprite, Text, TextStyle, Graphics } from "pixi.js-legacy";
import Config from "../config";
import Game from "../utility/Game";
import GameScene from "./GameScene";
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

    private addBackground(): void {
        const sky = Sprite.from("assets/images/tiles/sky.png");

        const clouds = Sprite.from("assets/images/tiles/clouds.png");
        clouds.y = 200;

        const forest = Sprite.from("assets/images/tiles/forest.png");
        forest.y = 305;

        this.addChild(sky);
        this.addChild(clouds);
        this.addChild(forest);
    }

    private addLogo(): void {
        const richText = new Text("Solaxia World", new TextStyle({
            fontFamily: "'VCR OSD Mono', Courier, monospace",
            fontSize: "64px",
            fontWeight: "bold"
        }));
        richText.anchor.set(0.5, 0.5);
        richText.x = Config.width / 2;
        richText.y = 200;

        this.addChild(richText);
    }

    private addInputLabels(): void {
        const usernameLabel = new Text("Username", new TextStyle({
            fontFamily: "'VCR OSD Mono', Courier, monospace",
            fontSize: "32px",
            fontWeight: "bold"
        }));
        usernameLabel.x = 400;
        usernameLabel.y = 265;

        const passwordLabel = new Text("Password", new TextStyle({
            fontFamily: "'VCR OSD Mono', Courier, monospace",
            fontSize: "32px",
            fontWeight: "bold"
        }));
        passwordLabel.x = 400;
        passwordLabel.y = 365;

        this.addChild(usernameLabel);
        this.addChild(passwordLabel);
    }

    private addInputs(): void {
        this.username = DOMHandler.createInputField("text", "game__username");
        this.password = DOMHandler.createInputField("password", "game__password");

        DOMHandler.add(this.username);
        DOMHandler.add(this.password);
    }

    private addLoginButton(): void {
        const loginLabel = new Text("Login", new TextStyle({
            fontFamily: "'VCR OSD Mono', Courier, monospace",
            fontSize: "24px",
            fontWeight: "bold"
        }));
        loginLabel.x = 800;
        loginLabel.y = 480;

        const loginBackground = new Graphics();
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

    private login(): void {
        const username = this.username?.value;
        // const password = this.password?.value;

        if (username) {
            this.game.setUsername(username);
        }

        this.scenes?.start("gameplay");
    }

    public stop(): void {
        DOMHandler.clearCanvas();
    }
}
