import Map from "../maps/Map";
import Player from "../player/Player";
import Game from "../utility/Game";
import GameScene from "./GameScene";
import DOMHandler from "../utility/DOMHandler";
import Camera from "../maps/Camera";
import Portal from "../portals/Portal";
import { Container } from "pixi.js-legacy";

export default class GameplayScene extends GameScene {

    private map?: Map;
    private gameplayContainer = new Container();
    private uiContainer = new Container();
    private player: Player = new Player(this.uiContainer);

    constructor(game: Game) {
        super(game);
        this.addChild(this.gameplayContainer);
        this.addChild(this.uiContainer);
    }

    public async start(): Promise<void> {
        if (this.app) {
            this.app.renderer.backgroundColor = 0x80c2fb;
        }

        this.addChatbox();

        this.loadMap(1);
    }

    private async loadMap(id: number): Promise<void> {
        this.map = new Map(this.gameplayContainer, id, this.changeMap.bind(this));
        await this.map.init();

        await this.player.init(this.map, this.game.getUsername());

        const character = this.player.getCharacter();

        if (character) {
            const camera = new Camera(this.uiContainer, this.map, character);
            this.map.setCamera(camera);
        }
    }

    private async changeMap(portal: Portal): Promise<void> {
        if (this.map) {
            this.gameplayContainer.removeChild(this.map.getContainer());

            const camera = this.map.getCamera();
            if (camera) {
                this.uiContainer.removeChild(camera.getContainer());
            }
        }

        this.loadMap(portal.getDestMap());
    }

    private addChatbox(): void {
        const chatbox = DOMHandler.createInputField("text", "game__chatbox");
        chatbox.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.code === "Enter") {
                this.chat(chatbox.value);
                chatbox.value = "";
            }
        });

        chatbox.addEventListener("focus", () => {
            this.player.chatboxFocus();
        });

        chatbox.addEventListener("blur", () => {
            this.player.chatboxBlur();
        });

        DOMHandler.add(chatbox);
    }

    private chat(message: string): void {
        console.log(message);
    }

    public update(): void {
        this.map?.update();
        this.player.update();
    }

    public stop(): void {
        DOMHandler.clearCanvas();
    }
}
