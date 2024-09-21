import { ElementHolder } from "./ElementHolder.js";

class Scene {
    constructor(game) {
        this.game = game;
        this.elementHolder = new ElementHolder(this.game);
    }

    get elements() {
        this.elementHolder?.list;
    }

    draw() {
        this.elementHolder.draw();
    }

    onKeyUp(e) {
        this.elementHolder.onKeyUp(e);
    }

    onKeyDown(e) {
        this.elementHolder.onKeyDown(e);
    }
}

export { Scene };
