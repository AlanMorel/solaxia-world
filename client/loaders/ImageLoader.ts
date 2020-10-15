import * as PIXI from "pixi.js-legacy";

export default class ImageLoader {

    public static async loadAsync(path: string): Promise<PIXI.Texture> {

        const texture = PIXI.Texture.from(path);

        if (texture.baseTexture.valid) {
            return this.resolveNow(texture);
        } else {
            return this.resolveLater(texture);
        }
    }

    private static resolveNow(texture: PIXI.Texture): Promise<PIXI.Texture> {
        return Promise.resolve(texture);
    }

    private static resolveLater(texture: PIXI.Texture): Promise<PIXI.Texture> {
        return new Promise(resolve => {
            texture.addListener("update", () => {
                resolve(texture);
            });
        });
    }
}
