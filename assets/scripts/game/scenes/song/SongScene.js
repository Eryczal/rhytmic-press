import { Scene } from "../../classes/Scene.js";
import { Track } from "./_elements/Track.js";

class SongScene extends Scene {
    constructor(game) {
        super(game);

        this.songArea = this.calculateArea();
    }

    get area() {
        return this.songArea;
    }

    async init() {
        if (!this.data.song) {
            throw new Error("SongScene without song");
        }

        await this.game.songManager.loadSong(this.data.song);
        this.elementHolder.addElement("track", new Track(this.game));

        super.init();
        this.game.songManager.init();
    }

    calculateArea() {
        let x = Math.min(this.game.sx, this.game.sy * 0.5);
        let y = this.game.sy;
        let start = (this.game.sx * 100 - x * 100) / 2;
        let end = start + x * 100;

        return { x, y, start, end };
    }

    onResize() {
        this.songArea = this.calculateArea();

        super.onResize();
    }
}

export { SongScene };
