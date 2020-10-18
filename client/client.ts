import { Application } from "pixi.js-legacy";
import Config from "./config";
import { SceneManager } from "pixi-scenes";
import LoginScene from "./scenes/LoginScene";
import GameplayScene from "./scenes/GameplayScene";
import Game from "./utility/Game";

const app = new Application({
    backgroundColor: 0xffb084,
    width: Config.width,
    height: Config.height
});

document.body.appendChild(app.view);

const game = new Game();

const scenes = new SceneManager(app);

scenes.add("login", new LoginScene(game));
scenes.add("gameplay", new GameplayScene(game));

scenes.start("login");
