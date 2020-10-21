import Character from "../player/Character";
import Projectile from "./Projectile";

export default class Star extends Projectile {

    constructor(character: Character) {
        super(character, "star", 50, 7, 0, 10);
    }
}
