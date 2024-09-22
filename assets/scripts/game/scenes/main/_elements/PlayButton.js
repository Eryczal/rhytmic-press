import { Element } from "../../../classes/Element.js";

class PlayButton extends Element {
    constructor(game) {
        super(game);
    }

    draw() {
        this.canvasManager.writeText("Naciśnij [enter] by grać", this.sx * 50, this.sy * 50, this.sx * 2, "#fff");
    }

    onKeyUp(e) {
        if (e.key === "Enter") {
            this.game.sceneManager.setScene("song");
        }
    }
}

export { PlayButton };
