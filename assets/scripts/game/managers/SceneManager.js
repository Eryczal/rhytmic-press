import { MainScene } from "../scenes/main/MainScene.js";
import { SongScene } from "../scenes/song/SongScene.js";

class SceneManager {
    constructor(game) {
        this.game = game;
        this.scene = new MainScene(this.game);
    }

    init() {
        this.scene?.init();
    }

    draw() {
        this.scene?.draw();
    }

    setScene(scene, options = {}) {
        switch (scene) {
            case "main":
                this.scene = new MainScene(this.game);
                break;

            case "song":
                this.scene = new SongScene(this.game);
                break;
        }

        for (let option in options) {
            this.scene.data[option] = options[option];
        }

        this.scene.init();
    }

    onResize() {
        this.scene.onResize();
    }

    onKeyUp(e) {
        this.scene.onKeyUp(e);
    }

    onKeyDown(e) {
        this.scene.onKeyDown(e);
    }
}

export { SceneManager };
