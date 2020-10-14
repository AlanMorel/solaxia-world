import Map from "../maps/Map";
import Map1 from "../maps/Map1";
import Player from "../player/Player";
import Game from "../utility/Game";
import GameScene from "../utility/GameScene";
import DOMHandler from "../utility/DOMHandler";
import Camera from "../maps/Camera";
import Portal from "../portals/Portal";

export default class GameplayScene extends GameScene {

    private player: Player = new Player(this.game);
    private map?: Map;

    constructor(game: Game) {
        super(game);
    }

    public async start(): Promise<void> {
        if (this.app) {
            this.app.renderer.backgroundColor = 0x80c2fb;
        }

        this.loadMap(1);

        this.addChatbox();
    }

    private async loadMap(id: number): Promise<void> {
        this.map = <Map> new Map1(this, this.changeMap.bind(this));
        await this.map.init();
        await this.map.background();

        await this.player.init(this.map);

        const camera = new Camera(this, this.map, this.player.getCharacter());
        this.map.setCamera(camera);

        this.map.foreground();
    }

    private async changeMap(portal: Portal): Promise<void> {
        if (this.map) {
            this.removeChild(this.map.getContainer());

            const camera = this.map.getCamera();
            if (camera) {
                this.removeChild(camera.getContainer());
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
        this.player.getCharacter()?.updateCharacter();
        this.map?.update();
    }

    public stop(): void {
        DOMHandler.clearCanvas();
    }
}
