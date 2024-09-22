import { MainScene } from "../scenes/main/MainScene.js";
import { SongScene } from "../scenes/song/SongScene.js";

class SceneManager {
    constructor(game) {
        this.game = game;
        this.scene = new MainScene(this.game);
    }

    draw() {
        this.scene?.draw();
    }

    setScene(scene) {
        switch (scene) {
            case "main":
                this.scene = new MainScene(this.game);
                break;

            case "song":
                this.scene = new SongScene(this.game);
                break;
        }
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
