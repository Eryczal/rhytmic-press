class EventManager {
    constructor(game) {
        this.game = game;

        window.addEventListener("keyup", (e) => this.onKeyUp(e));
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
    }

    onKeyUp(e) {
        this.game.sceneManager.onKeyUp(e);
    }

    onKeyDown(e) {
        this.game.sceneManager.onKeyDown(e);
    }
}

export { EventManager };
