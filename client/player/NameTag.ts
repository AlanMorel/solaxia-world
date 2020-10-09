import * as PIXI from "pixi.js-legacy";
import { Scene } from "pixi-scenes";

export default class NameTag {

    private nameTag: PIXI.Text;

    constructor(scene: Scene) {

        this.nameTag = new PIXI.Text("Alan", {
            fontFamily: "Arial", 
            fontSize: 14,
            fill : 0x00000
        });
        this.nameTag.anchor.set(0.5, 0);
        
        scene.addChild(this.nameTag);
    }


    public update(sprite: PIXI.Sprite) {
        this.nameTag.x = sprite.x;
        this.nameTag.y = sprite.y + sprite.height + 10;
    }
}
