import Key from "./Key";

export default class KeyListener {

    private key: Key;
    private active: boolean;

    constructor(value: string) {
        this.key = {
            value: value,
            isDown: false,
            isUp: true,
            press: null,
            release: null,
            unsubscribe: (): void => {
                window.removeEventListener("keydown", downListener);
                window.removeEventListener("keyup", upListener);
            }
        };

        this.active = true;

        const downListenerCallback = (event: KeyboardEvent): void => {
            if (event.code !== this.key.value || !this.active) {
                return;
            }
            event.preventDefault();
            if (this.key.isUp && this.key.press) {
                this.key.press();
            }
            this.key.isDown = true;
            this.key.isUp = false;
        };

        const upListenerCallback = (event: KeyboardEvent): void => {
            if (event.code !== this.key.value || !this.active) {
                return;
            }
            event.preventDefault();
            if (this.key.isDown && this.key.release) {
                this.key.release();
            }
            this.key.isDown = false;
            this.key.isUp = true;
        };

        const downListener = downListenerCallback.bind(this.key);
        const upListener = upListenerCallback.bind(this.key);

        window.addEventListener("keydown", downListener, false);
        window.addEventListener("keyup", upListener, false);
    }

    public onDown(callback: () => void): KeyListener {
        this.key.press = callback;
        return this;
    }

    public onUp(callback: () => void): KeyListener {
        this.key.release = callback;
        return this;
    }

    public isUp(): boolean {
        return this.key.isUp;
    }

    public isDown(): boolean {
        return this.key.isDown;
    }

    public pause(): void {
        this.active = false;
    }

    public resume(): void {
        this.active = true;
    }
}
