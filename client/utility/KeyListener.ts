import Key from "./Key";

export default class KeyListener {
    
    private key: Key;

    constructor(value: string) {
        this.key = {
            value: value,
            isDown: false,
            isUp: true,
            press: null,
            release: null,
            unsubscribe: () => {
                window.removeEventListener("keydown", downListener);
                window.removeEventListener("keyup", upListener);
            }
        };

        const downListenerCallback = (event: KeyboardEvent) => {
            event.preventDefault();
            if (event.key !== this.key.value) {
                return;
            }
            if (this.key.isUp && this.key.press) {
                this.key.press();
            }
            this.key.isDown = true;
            this.key.isUp = false;
        };

        const upListenerCallback = (event: KeyboardEvent) => {
            event.preventDefault();
            if (event.key !== this.key.value) {
                return;
            }
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

    setPress(callback: Function): KeyListener {
        this.key.press = callback;
        return this;
    }

    setRelease(callback: Function): KeyListener {
        this.key.release = callback;
        return this;
    }

    isUp() {
        return this.key.isUp;
    }

    isDown() {
        return this.key.isDown;
    }
}
