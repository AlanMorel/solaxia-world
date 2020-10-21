import * as PIXI from "pixi.js-legacy";

export default abstract class WrapperContainer {

    protected container: PIXI.Container;

    constructor(scene: PIXI.Container) {
        this.container = new PIXI.Container();
        scene.addChild(this.container);
    }

    public getContainer(): PIXI.Container {
        return this.container;
    }
}
