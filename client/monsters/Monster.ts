import * as PIXI from "pixi.js-legacy";
import Map from "../maps/Map";
import AnimatedMapObject from "../maps/AnimatedMapObject";

export default class Monster extends AnimatedMapObject {

    constructor(scene: PIXI.Container, map: Map, name: string) {
        super(scene, map, "monsters/" + name);
        this.y = 50;
    }

    public async initMonster(): Promise<void> {
        await this.init();
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

    public updateMonster(): void {
        this.update(this.map);
    }
}
