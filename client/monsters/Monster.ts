import { Scene } from "pixi-scenes";
import Map from "../maps/Map";
import AnimatedMapObject from "../maps/AnimatedMapObject";

export default class Monster extends AnimatedMapObject {

    constructor(scene: Scene, map: Map, name: string, standing: number, walking: number) {
        super(scene, map, "assets/images/monsters/" + name + "/", standing, walking);
        this.y = 50;
        this.randomizedMovement();
    }

    private randomizedMovement(): void {
        const action = Math.random() * 100;
        if (action < 20) {
            this.moveLeft();
        } else if (action < 40) {
            this.moveRight();
        } else if (action < 75) {
            this.stop();
        } else {
            this.jump();
        }
        setTimeout(() => {
            this.randomizedMovement();
        }, Math.random() * 100 * 3 + 1000);
    }

    public updateMonster(): void {
        this.update(this.map);
    }
}
