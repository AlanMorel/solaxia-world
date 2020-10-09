import { Scene } from "pixi-scenes";
import Game from "./Game";

export default class GameScene extends Scene {
    protected game: Game;

    constructor(game: Game) {
        super();
        this.game = game;
    }
}
