import { Graphics, Container } from "pixi.js-legacy";
import Monster from "./Monster";

export default class HPBar {

    private hpBarBackground: Graphics;
    private hpBarForeground: Graphics;

    private readonly width = 50;

    constructor() {
        this.hpBarBackground = new Graphics();
        this.hpBarBackground.beginFill(0x000000, 0.5);
        this.hpBarBackground.drawRect(this.hpBarBackground.x, this.hpBarBackground.y, this.width, 5);

        this.hpBarForeground = new Graphics();
        this.hpBarForeground.beginFill(0x00FF00, 0.75);
        this.hpBarForeground.drawRect(this.hpBarForeground.x, this.hpBarForeground.y, this.width, 5);
    }

    public init(container: Container): void {
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
