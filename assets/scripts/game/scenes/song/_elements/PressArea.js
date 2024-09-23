import { Element } from "../../../classes/Element.js";

class PressArea extends Element {
    constructor(game) {
        super(game);
    }

    init() {
        this.songArea = this.game.sceneManager.scene.area;

        this.pressY = this.songArea.y * 75;
        this.pressH = this.songArea.y * 11;

        this.cells = [];

        for (let i = 0; i < 4; i++) {
            this.cells[i] = new PressCell(this.game, i, this.pressY, this.pressH);
            this.cells[i].init();
        }
    }

    draw() {
        for (let cell in this.cells) {
            this.cells[cell].draw();
        }
    }

    onResize() {
        this.songArea = this.game.sceneManager.scene.area;

        this.pressY = this.songArea.y * 75;
        this.pressH = this.songArea.y * 11;

        for (let cell in this.cells) {
            this.cells[cell].draw();
        }
    }

    onKeyDown(e) {
        if (this.cells[this.getCellId(e)]) {
            this.cells[this.getCellId(e)].active = true;
        }
    }

    onKeyUp(e) {
        if (this.cells[this.getCellId(e)]) {
            this.cells[this.getCellId(e)].active = false;
        }
    }

    getCellId(e) {
        switch (e.key) {
            case "ArrowLeft":
                return 0;

            case "ArrowUp":
                return 1;

            case "ArrowDown":
                return 2;

            case "ArrowRight":
                return 3;
        }
    }
}

class PressCell extends Element {
    constructor(game, id, pressY, pressH) {
        super(game);
        this.id = id;
        this.pressY = pressY;
        this.pressH = pressH;
        this.active = false;
    }

    init() {
        this.songArea = this.game.sceneManager.scene.area;
    }

    draw() {
        if (!this.songArea) {
            return;
        }

        this.ctx.fillStyle = this.active ? "#a66" : "#666";
        this.ctx.fillRect(this.songArea.start + this.songArea.x * 25 * this.id + this.songArea.x * 0.5, this.pressY, this.songArea.x * 24, this.pressH);
    }

    onResize() {
        this.songArea = this.game.sceneManager.scene.area;
    }
}

export { PressArea };
