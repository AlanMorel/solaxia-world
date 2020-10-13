import * as PIXI from "pixi.js-legacy";

export default class ImageLoader {

    public static async loadAsync(path: string): Promise<PIXI.Texture> {

        const texture = PIXI.Texture.from(path);

        return new Promise((resolve, reject) => {
            texture.addListener("update", () => {
                resolve(texture);
            });
        });
    }
}
