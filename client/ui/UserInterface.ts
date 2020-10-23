import { Graphics, Text, TextStyle }from "pixi.js-legacy";
import { Scene } from "pixi-scenes";
import WrapperContainer from "../utility/WrapperContainer";
import Player from "../player/Player";

export default class UserInterface extends WrapperContainer {

    private player: Player;

    private levelLabel: Text;
    private usernameLabel: Text;

    constructor(scene: Scene, player: Player) {
        super(scene);

        this.player = player;

        const uiBackground = new Graphics();
        uiBackground.beginFill(0xFFFFFF, 0.5);
        uiBackground.drawRect(0, 620, 1280, 100);

        const textStyle = new TextStyle({
            fontFamily: "'VCR OSD Mono', Courier, monospace",
            fontSize: "24px"
        });

        this.levelLabel = new Text("", textStyle);
        this.levelLabel.x = 10;
        this.levelLabel.y = 680;

        this.usernameLabel = new Text("", textStyle);
        this.usernameLabel.x = 150;
        this.usernameLabel.y = 680;

        this.container.addChild(uiBackground);
        this.container.addChild(this.levelLabel);
        this.container.addChild(this.usernameLabel);
    }

    public update(): void {
        const character = this.player.getCharacter();
        if (!character) {
            return;
        }
        this.levelLabel.text = "Lv. " + character.getLevel();
        this.usernameLabel.text = character.getUsername();
    }
}
