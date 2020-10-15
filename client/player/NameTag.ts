import * as PIXI from "pixi.js-legacy";

export default class NameTag {

    private nameTag: PIXI.Text;
    private nameTagBackground: PIXI.Graphics;

    constructor(scene: PIXI.Container, username: string) {

        this.nameTag = new PIXI.Text(username, {
            fontFamily: "Arial",
            fontSize: 14,
            fill: 0xFFFFFF
        });
        this.nameTag.anchor.set(0.5, 0);

        this.nameTagBackground = new PIXI.Graphics();
        this.nameTagBackground.beginFill(0x000000, 0.25);
        this.nameTagBackground.drawRoundedRect(this.nameTag.x, this.nameTag.y, this.nameTag.width + 20, 25, 4);

        scene.addChild(this.nameTagBackground);
        scene.addChild(this.nameTag);
    }

    public update(sprite: PIXI.Sprite): void {
        this.nameTag.x = sprite.x;
        this.nameTag.y = sprite.y + sprite.height + 15;

        this.nameTagBackground.x = this.nameTag.x - this.nameTag.width / 2 - 10;
        this.nameTagBackground.y = this.nameTag.y - 5;
    }
}
