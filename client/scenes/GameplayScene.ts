import * as PIXI from "pixi.js-legacy";
import Map from "../maps/Map";
import Map1 from "../maps/Map1";
import Player from "../player/Player";
import Game from "../utility/Game";
import GameScene from "../utility/GameScene";
import DOMHandler from "../utility/DOMHandler";
import Camera from "../maps/Camera";

export default class GameplayScene extends GameScene {

    private player?: Player;
    private map?: Map;
    private mapContainer: PIXI.Container;

    constructor(game: Game) {
        super(game);
        this.mapContainer = new PIXI.Container();
    }

    public start(): void {
        if (this.app) {
            this.app.renderer.backgroundColor = 0x80c2fb;
        }

        this.mapContainer = new PIXI.Container();
        this.addChild(this.mapContainer);

        this.map = <Map> new Map1(this.mapContainer);
        this.map.background();

        this.player = new Player(this.game, this.mapContainer, this.map);

        const camera = new Camera(this, this.mapContainer, this.map, this.player);
        this.map.setCamera(camera);

        this.map.foreground();

        this.addChatbox();
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
            this.player?.chatboxFocus();
        });

        chatbox.addEventListener("blur", () => {
            this.player?.chatboxBlur();
        });

        DOMHandler.add(chatbox);
    }

    private chat(message: string): void {
        console.log(message);
    }

    public update(): void {
        this.player?.updateCharacter();
        this.map?.update();
    }

    public stop(): void {
        DOMHandler.clearCanvas();
    }
}
