import Map from "../maps/Map";
import AnimatedMapObject from "../maps/AnimatedMapObject";
import HPBar from "./HPBar";
import { Rectangle } from "../utility/Rectangle";

export default class Monster extends AnimatedMapObject {

    private hpBar: HPBar = new HPBar();

    constructor(map: Map, name: string, x: number, y: number) {
        super(map, "monsters/" + name);
        this.x = x;
        this.y = y;
    }

    public async init(): Promise<void> {
        await super.init();
        this.hpBar.init(this.map.getContainer());
        this.randomizedMovement();
    }

    private randomizedMovement(): void {
        const action = Math.random() * 100;
        if (action < 15) {
            this.moveLeft();
        } else if (action < 35) {
            this.moveRight();
        } else if (action < 70) {
            this.stop();
        } else if (action < 80) {
            this.jumpUp();
        } else if (action < 90) {
            this.jumpLeft();
        } else {
            this.jumpRight();
        }
        setTimeout(() => {
            this.randomizedMovement();
        }, Math.random() * 100 * 3 + 1000);
    }

    public kill(): void {
        let alpha = this.getSprite().alpha;

        if (alpha === 1) {
            // reward exp
        }

        if (alpha > 0) {
            alpha -= 0.1;
        } else {
            this.resetHP();
            this.getMap().removeMonster(this);
            this.getMap().respawnMonster(this);
        }

        this.getSprite().alpha = alpha;
    }

    public getRectangle(): Rectangle {
        const rect: Rectangle = {
            left:   this.x - this.getSprite().width / 2,
            top:    this.y - this.getSprite().height / 2,
            right:  this.x + this.getSprite().width / 2,
            bottom: this.y + this.getSprite().height / 2
        };
        return rect;
    }

    public update(): void {
        super.update();
        this.hpBar.update(this);

        if (this.isDead()) {
            this.kill();
        }
    }
}
