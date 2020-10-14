import * as PIXI from "pixi.js-legacy";

export default abstract class Container {

    protected scene: PIXI.Container;

    constructor(scene: PIXI.Container) {
        this.scene = new PIXI.Container();
        scene.addChild(this.scene);
    }

    public getContainer(): PIXI.Container {
        return this.scene;
    }
}