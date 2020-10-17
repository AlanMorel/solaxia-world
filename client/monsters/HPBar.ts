import * as PIXI from "pixi.js-legacy"; 
import Monster from "./Monster";

export default class HPBar {

    private hpBarBackground: PIXI.Graphics;
    private hpBarForeground: PIXI.Graphics;

    constructor() {
        this.hpBarBackground = new PIXI.Graphics();
        this.hpBarBackground.beginFill(0x000000, 0.75);
        this.hpBarBackground.drawRect(this.hpBarBackground.x, this.hpBarBackground.y, 50, 5);

        this.hpBarForeground = new PIXI.Graphics();
        this.hpBarForeground.beginFill(0x00FF00, 0.5);
        this.hpBarForeground.drawRect(this.hpBarForeground.x, this.hpBarForeground.y, 50, 5);
    }

    public init(container: PIXI.Container): void {
        container.addChild(this.hpBarBackground);
        container.addChild(this.hpBarForeground);
    }

    public update(monster: Monster): void {
        this.hpBarBackground.x = monster.getSprite().x - 25;
        this.hpBarBackground.y = monster.getSprite().y + monster.getSprite().height + 10;

        this.hpBarForeground.width = monster.getHP() * 50 / monster.getMaxHP();
        this.hpBarForeground.x = monster.getSprite().x - 25;
        this.hpBarForeground.y = monster.getSprite().y + monster.getSprite().height + 10;
    }
}
