import { CanvasManager } from "./managers/CanvasManager.js";
import { EventManager } from "./managers/EventManager.js";
import { ResizeManager } from "./managers/ResizeManager.js";
import { SceneManager } from "./managers/SceneManager.js";

class Game {
    constructor() {
        this.eventManager = new EventManager(this);
        this.sceneManager = new SceneManager(this);
        this.resizeManager = new ResizeManager(this);
        this.canvasManager = new CanvasManager("canvas");
    }

    init() {
        this.draw();
    }

    draw() {
        this.canvasManager.ctx.clearRect(0, 0, this.canvasManager.canvas.width, this.canvasManager.canvas.height);

        this.sceneManager.draw();

        window.requestAnimationFrame(() => this.draw());
    }
}

export { Game };
