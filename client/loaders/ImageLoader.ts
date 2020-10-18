import { Texture } from "pixi.js-legacy";

export default class ImageLoader {

    public static async loadAsync(path: string): Promise<Texture> {

        const texture = Texture.from("/assets/images/" + path + ".png");

        if (texture.baseTexture.valid) {
            return this.resolveNow(texture);
        } else {
            return this.resolveLater(texture);
        }
    }

    private static resolveNow(texture: Texture): Promise<Texture> {
        return Promise.resolve(texture);
    }

    private static resolveLater(texture: Texture): Promise<Texture> {
        return new Promise(resolve => {
            texture.addListener("update", () => {
                resolve(texture);
            });
        });
    }
}
