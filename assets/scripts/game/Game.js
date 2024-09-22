import { EventManager } from "./managers/EventManager.js";
import { ResizeManager } from "./managers/ResizeManager.js";
import { SceneManager } from "./managers/SceneManager.js";

class Game {
    constructor() {
        this.eventManager = new EventManager(this);
        this.sceneManager = new SceneManager(this);
        this.resizeManager = new ResizeManager(this);
    }

    init() {
        this.draw();
    }

    draw() {
        this.sceneManager.draw();

        window.requestAnimationFrame(() => this.draw());
    }
}

export { Game };
