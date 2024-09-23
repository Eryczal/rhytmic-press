import { CanvasManager } from "../managers/CanvasManager.js";

class Element {
    constructor(game) {
        this.game = game;
        this.canvasManager = new CanvasManager("canvas");
        this.ctx = this.canvasManager.ctx;
        this.sx = this.game.sx;
        this.sy = this.game.sy;
    }

    init() {}

    draw() {}

    onResize() {
        this.sx = this.game.sx;
        this.sy = this.game.sy;
    }

    onKeyUp(e) {}

    onKeyDown(e) {}
}

export { Element };
