import { Element } from "../../../classes/Element.js";

class PressCell extends Element {
    constructor(game, id, pressY, pressH) {
        super(game);
        this.id = id;
        this.pressY = pressY;
        this.pressH = pressH;
        this.pressedTime = null;
        this.used = false;
        this.holding = false;
    }

    init() {
        this.songArea = this.game.sceneManager.scene.area;
    }

    draw() {
        if (!this.songArea) {
            return;
        }

        this.ctx.fillStyle = this.pressedTime === null ? "#666" : "#a66";
        this.ctx.fillRect(this.songArea.start + this.songArea.x * 25 * this.id + this.songArea.x * 0.5, this.pressY, this.songArea.x * 24, this.pressH);
    }

    onResize() {
        this.songArea = this.game.sceneManager.scene.area;
    }
}

export { PressCell };
