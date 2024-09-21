import { Element } from "../../../classes/Element.js";

class PlayButton extends Element {
    constructor(game) {
        super(game);
    }

    draw() {
        this.canvasManager.writeText("Naciśnij [enter] by grać", 200, 100, 26, "#fff");
    }

    onKeyUp(e) {
        if (e.key === "Enter") {
        }
    }
}

export { PlayButton };
