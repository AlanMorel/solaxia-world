import * as PIXI from "pixi.js-legacy";
import Config from "./config";
import { SceneManager } from "pixi-scenes";
import LoginScene from "./scenes/LoginScene";

const app = new PIXI.Application({ 
    backgroundColor: 0xffb084,
    width: Config.width,
    height: Config.height
});

document.body.appendChild(app.view);

const scenes = new SceneManager(app);

scenes.add("login", new LoginScene());

scenes.start("login");
