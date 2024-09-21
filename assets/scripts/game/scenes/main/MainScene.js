import { Scene } from "../../classes/Scene.js";
import { PlayButton } from "./_elements/PlayButton.js";

class MainScene extends Scene {
    constructor(game) {
        super(game);

        this.elementHolder.addElement("play", new PlayButton(game));
    }
}

export { MainScene };
