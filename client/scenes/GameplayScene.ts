import { Scene } from "pixi-scenes";
import Map1 from "../maps/Map1";
import Player from "../utility/Player";

export default class GameplayScene extends Scene {
    private player?: Player;

    constructor() {
        super();
    }

    public start(): void {
        const map = new Map1(this);
        map.background();

        this.player = new Player(this, map);
    
        map.foreground();

        if (this.app) {
            this.app.renderer.backgroundColor = 0x80c2fb;
        }
    }

    public update(delta: number): void {
        this.player?.update();
    }
}
