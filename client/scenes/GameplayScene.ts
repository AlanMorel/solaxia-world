import Map1 from "../maps/Map1";
import Player from "../player/Player";
import Game from "../utility/Game";
import GameScene from "../utility/GameScene";

export default class GameplayScene extends GameScene {

    private player?: Player;

    constructor(game: Game) {
        super(game);
    }

    public start(): void {
        const map = new Map1(this);
        map.background();

        this.player = new Player(this.game, this, map);
    
        map.foreground();

        if (this.app) {
            this.app.renderer.backgroundColor = 0x80c2fb;
        }
    }

    public update(delta: number): void {
        this.player?.update();
    }
}
