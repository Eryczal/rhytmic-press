import { PressCell } from "../scenes/song/_elements/PressCell.js";

class SongManager {
    constructor(game) {
        this.game = game;
        this.songStart = 0;
    }

    init() {
        this.songArea = this.game.sceneManager.scene.area;
        this.score = 0;

        this.pressY = this.songArea.y * 75;
        this.pressH = this.songArea.y * 11;
        this.noteWidth = this.songArea.x * 24;
        this.noteHeight = this.pressH;

        // this.startingBeat = 20;

        this.cells = [];

        for (let i = 0; i < 4; i++) {
            this.cells[i] = new PressCell(this.game, i, this.pressY, this.pressH);
            this.cells[i].init();
        }

        this.ctx = this.game.canvasManager.ctx;
        this.beatOffset = 2;
        this.playing = false;
        this.startSong();
    }

    async loadSong(name) {
        try {
            const [audio, data] = await Promise.all([this.loadAudio(name), this.loadData(name)]);

            this.songAudio = audio;
            this.songData = data;

            this.beat = (60 / this.songData.bpm) * 1000;
        } catch (error) {
            throw new Error("Can't load song");
        }
    }

    startSong() {
        this.songStart = performance.now();

        if (this.startingBeat) {
            this.songStart -= this.startingBeat * this.beat;
        }

        setTimeout(() => {
            if (this.startingBeat) {
                this.songAudio.currentTime = (this.startingBeat * this.beat) / 1000;
            }
            this.songAudio.play();
        }, this.beatOffset * this.beat);

        this.playing = true;
        this.processNotes();
    }

    processNotes() {
        const elapsed = performance.now() - this.songStart;

        this.draw();

        for (let i = 0; i < this.songData.notes.length; i++) {
            const note = this.songData.notes[i];
            const timeSinceStart = elapsed - (note.beat - 2 + this.beatOffset) * this.beat;
            const timeSinceHit = elapsed - (note.beat + this.beatOffset) * this.beat;

            if (timeSinceStart >= 0 && timeSinceHit < 3000) {
                const progress = (timeSinceStart / this.beat) * this.songData.speed;

                const y = this.pressY * progress;

                this.drawNote(note.key, y, note.type);
                let clicked = this.checkNote(note);

                if (clicked) {
                    this.cells[this.getCellId(note.key)].used = true;
                }

                if (y > this.game.canvasManager.canvas.height + this.noteHeight || clicked) {
                    this.songData.notes.splice(i, 1);
                    i--;
                }
            } else if (timeSinceStart > 500) {
                if (!this.startingBeat) {
                    break;
                }
            }
        }
    }

    draw() {
        for (let cell in this.cells) {
            this.cells[cell].draw();
        }

        this.game.canvasManager.writeText(`Wynik: ${this.score}`, 100, 50, 26);
    }

    drawNote(key, y, type) {
        this.ctx.fillStyle = "#696";
        this.ctx.fillRect(this.getPosition(key), y, this.noteWidth, this.noteHeight);
        this.game.canvasManager.writeText(this.getArrow(key), this.getPosition(key) + this.noteWidth / 2, y + this.noteHeight / 2, this.noteWidth);
    }

    checkNote(note) {
        const cell = this.cells[this.getCellId(note.key)];

        if (cell.pressedTime === null || cell.used) {
            return false;
        }

        const difference = Math.abs(cell.pressedTime - (note.beat + this.beatOffset - 1) * this.beat);

        if (difference >= 200) {
            return false;
        }

        this.score += difference < 80 ? 100 : 20;

        cell.used = true;

        return true;
    }

    onResize() {
        this.songArea = this.game.sceneManager.scene.area;

        this.pressY = this.songArea.y * 75;
        this.pressH = this.songArea.y * 11;

        for (let cell in this.cells) {
            this.cells[cell].onResize();
        }
    }

    onKeyDown(e) {
        if (this.cells[this.getCellId(e.key)]) {
            this.cells[this.getCellId(e.key)].pressedTime = performance.now() - this.songStart;
        }
    }

    onKeyUp(e) {
        if (this.cells[this.getCellId(e.key)]) {
            this.cells[this.getCellId(e.key)].pressedTime = null;
            this.cells[this.getCellId(e.key)].used = false;
        }
    }

    getPosition(key) {
        return this.songArea.start + this.songArea.x * 0.5 + this.songArea.x * 25 * this.getCellId(key);
    }

    async loadAudio(name) {
        return new Promise((resolve, reject) => {
            let audio = new Audio();
            audio.src = `assets/music/${name}/audio.mp3`;
            audio.oncanplaythrough = () => resolve(audio);
            audio.onerror = reject;
        });
    }

    async loadData(name) {
        const response = await fetch(`assets/music/${name}/data.json`);

        if (!response.ok) {
            throw new Error(`Can't load song data`);
        }

        return response.json();
    }

    getCellId(key) {
        switch (key) {
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

    getArrow(key) {
        switch (key) {
            case "ArrowLeft":
                return "⬅️";

            case "ArrowUp":
                return "⬆️";

            case "ArrowDown":
                return "⬇️";

            case "ArrowRight":
                return "➡️";
        }
    }
}

export { SongManager };
