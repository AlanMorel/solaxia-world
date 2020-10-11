export default interface Key {
    value: string;
    isDown: boolean;
    isUp: boolean;
    unsubscribe: Function;
    press: Function | null;
    release: Function | null;
};
