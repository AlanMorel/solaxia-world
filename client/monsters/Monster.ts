import Map from "../maps/Map";
import AnimatedLifeMapObject from "../maps/AnimatedLifeMapObject";
import HPBar from "./HPBar";
import { Rectangle } from "../utility/Rectangle";
import { MonsterState } from "./MonsterState";

export default class Monster extends AnimatedLifeMapObject {

    private hpBar: HPBar = new HPBar();
    private monsterState: MonsterState = MonsterState.UNINITIALIZED;

    constructor(map: Map, name: string, x: number, y: number) {
        super(map, "monsters/" + name);
        this.x = x;
        this.y = y;
    }

    public async init(): Promise<void> {
        await super.init();
        this.hpBar.init(this.container);
        this.monsterState = MonsterState.ALIVE;
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
        switch(this.monsterState) {
            case MonsterState.ALIVE: {
                this.monsterState = MonsterState.DYING;
                // reward exp
                break;
            }
            case MonsterState.DYING: {
                const alpha = this.container.alpha - 0.1;
                if (alpha > 0) {
                    this.container.alpha = alpha;
                } else {
                    this.resetHP();
                    this.getMap().removeMonster(this);
                    this.getMap().respawnMonster(this);
                    this.monsterState = MonsterState.RESPAWNING;
                }
                break;
            }
        }
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

    private respawn(): void {
        let alpha = this.container.alpha;

        if (alpha < 1) {
            alpha += 0.1;
            this.container.alpha = alpha;
        } else {
            this.monsterState = MonsterState.ALIVE;
        }
    }

    public update(): void {
        super.update();
        this.hpBar.update(this);

        if (this.isDead()) {
            this.kill();
        } else if (this.monsterState === MonsterState.RESPAWNING) {
            this.respawn();
        }
    }
}
