import * as PIXI from "pixi.js-legacy";
import Config from "./config";

const app = new PIXI.Application({ 
    backgroundColor: 0xffb084,
    width: Config.width,
    height: Config.height
});

document.body.appendChild(app.view);

const sky = PIXI.Sprite.from("assets/images/sky.png");

const clouds = PIXI.Sprite.from("assets/images/clouds.png");
clouds.y = 200;

const trees = PIXI.Sprite.from("assets/images/trees.png");
trees.y = Config.height - 415;

const style = new PIXI.TextStyle({
    fontFamily: "'VCR OSD Mono', Courier, monospace",
    fontSize: "64px",
    fontWeight: "bold",
    fill: 0x000000
});

const richText = new PIXI.Text("Solaxia World", style);
richText.anchor.set(0.5, 0.5);
richText.x = Config.width / 2;
richText.y = 200;

app.stage.addChild(sky);
app.stage.addChild(clouds);
app.stage.addChild(trees);

app.stage.addChild(richText);

// Listen for animate update
app.ticker.add((delta) => {
    // just for fun, let"s rotate mr rabbit a little
    // delta is 1 if running at 100% performance
    // creates frame-independent transformation
});
