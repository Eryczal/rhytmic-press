import { CanvasManager } from "./CanvasManager.js";

class ResizeManager {
    constructor(game) {
        this.game = game;
        this.canvasManager = new CanvasManager("canvas");

        window.addEventListener("resize", () => this.handleResize());

        this.handleResize();
    }

    handleResize() {
        let canvas = this.canvasManager.canvas;
        let pixelRatio = Math.ceil(window.devicePixelRatio) || 1;

        canvas.width = window.innerWidth * pixelRatio;
        canvas.height = window.innerHeight * pixelRatio;

        canvas.style.width = window.innerWidth;
        canvas.style.height = window.innerHeight;

        this.game.pixelRatio = pixelRatio;
        this.game.sx = canvas.width / 100;
        this.game.sy = canvas.height / 100;
        this.game.sceneManager.onResize();
    }
}

export { ResizeManager };
