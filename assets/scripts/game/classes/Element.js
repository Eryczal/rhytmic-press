import { CanvasManager } from "../managers/CanvasManager.js";

class Element {
    constructor(game) {
        this.game = game;
        this.canvasManager = new CanvasManager("canvas");
    }

    draw() {}

    onKeyUp(e) {}

    onKeyDown(e) {}
}

export { Element };
