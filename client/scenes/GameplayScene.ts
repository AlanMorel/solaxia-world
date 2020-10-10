import Map from "../maps/Map";
import Map1 from "../maps/Map1";
import Player from "../player/Player";
import Game from "../utility/Game";
import GameScene from "../utility/GameScene";
import DOMHandler from "../utility/DOMHandler";

export default class GameplayScene extends GameScene {

    private player?: Player;

    constructor(game: Game) {
        super(game);
    }

    public start(): void {
        if (this.app) {
            this.app.renderer.backgroundColor = 0x80c2fb;
        }

        const map = <Map> new Map1(this);
        map.background();

        this.player = new Player(this.game, this, map);
    
        map.foreground();

        this.addChatbox();
    }

    private addChatbox() {
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

        const canvas = document.querySelector("#game");
        canvas?.appendChild(chatbox);
    }

    private chat(message: String) {
        console.log(message);
    }

    public update(delta: number): void {
        this.player?.update();
    }

    public stop(): void {
        DOMHandler.clearCanvas();
    }
}
