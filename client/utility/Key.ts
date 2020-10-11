export default interface Key {
    value: string;
    isDown: boolean;
    isUp: boolean;
    unsubscribe: () => void;
    press: { () : void } | null;
    release: { () : void } | null;
}
