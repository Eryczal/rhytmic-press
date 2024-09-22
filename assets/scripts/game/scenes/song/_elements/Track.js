import { Element } from "../../../classes/Element.js";

class Track extends Element {
    constructor(game, area) {
        super(game);

        this.songArea = area;
    }

    draw() {
        this.ctx.fillStyle = "#333";
        this.ctx.fillRect(this.songArea.start, 0, this.songArea.x * 100, this.sy * 100);
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(this.songArea.start + this.songArea.x * 24.5, 0, this.songArea.x, this.sy * 100);
        this.ctx.fillRect(this.songArea.start + this.songArea.x * 49.5, 0, this.songArea.x, this.sy * 100);
        this.ctx.fillRect(this.songArea.start + this.songArea.x * 74.5, 0, this.songArea.x, this.sy * 100);
    }

    onResize() {
        this.songArea = this.game.sceneManager.scene.area;
    }
}

export { Track };
