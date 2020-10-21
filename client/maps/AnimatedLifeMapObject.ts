import MapObjectLoader, { MapObjectData } from "../loaders/MapObjectLoader";
import AnimatedMapObject from "./AnimatedMapObject";

export default class AnimatedLifeMapObject extends AnimatedMapObject {

    protected hp = 100;
    protected maxHp = 100;

    public async init(): Promise<void> {
        const data: MapObjectData = await MapObjectLoader.loadObject(this.path);
        await super.init(data.sprites);

        this.hp = data.hp;
        this.maxHp = data.hp;
        this.speed = data.speed;
        this.jump = data.jump;
    }

    public getHP(): number {
        return this.hp;
    }

    public getMaxHP(): number {
        return this.maxHp;
    }

    public resetHP(): void {
        this.hp = this.maxHp;
    }

    public damage(amount: number): void {
        this.hp -= amount;
    }

    public isDead(): boolean {
        return this.hp < 1;
    }
}
