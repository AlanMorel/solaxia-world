import * as PIXI from "pixi.js-legacy";
import Monster from "./Monster";

export default class HPBar {

    private hpBarBackground: PIXI.Graphics;
    private hpBarForeground: PIXI.Graphics;

    private readonly width = 50;

    constructor() {
        this.hpBarBackground = new PIXI.Graphics();
        this.hpBarBackground.beginFill(0x000000, 0.5);
        this.hpBarBackground.drawRect(this.hpBarBackground.x, this.hpBarBackground.y, this.width, 5);

        this.hpBarForeground = new PIXI.Graphics();
        this.hpBarForeground.beginFill(0x00FF00, 0.75);
        this.hpBarForeground.drawRect(this.hpBarForeground.x, this.hpBarForeground.y, this.width, 5);
    }

    public init(container: PIXI.Container): void {
        container.addChild(this.hpBarBackground);
        container.addChild(this.hpBarForeground);
    }

    public update(monster: Monster): void {
        this.hpBarBackground.x = monster.getSprite().x - this.width / 2;
        this.hpBarBackground.y = monster.getSprite().y + monster.getSprite().height + 10;

        this.hpBarForeground.x = monster.getSprite().x - this.width / 2;
        this.hpBarForeground.y = monster.getSprite().y + monster.getSprite().height + 10;
        this.hpBarForeground.width = monster.getHP() * this.width / monster.getMaxHP();
    }
}
