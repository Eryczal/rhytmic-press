class SongManager {
    constructor(game) {
        this.game = game;
        this.songStart = 0;
    }

    init() {
        this.elements = this.game.sceneManager.scene.elementHolder.list;
        this.ctx = this.game.canvasManager.ctx;
        this.beatOffset = 2;
        this.playing = false;
        this.startSong();

        this.noteWidth = this.elements.pressArea.songArea.x * 24;
        this.noteHeight = this.elements.pressArea.pressH;
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

        setTimeout(() => {
            this.songAudio.play();
        }, this.beatOffset * this.beat);

        this.playing = true;
        this.playSong();
    }

    playSong() {
        const elapsed = performance.now() - this.songStart;

        for (let i = 0; i < this.songData.notes.length; i++) {
            const note = this.songData.notes[i];
            const timeSinceStart = elapsed - (note.beat - 2 + this.beatOffset) * this.beat;
            const timeSinceHit = elapsed - (note.beat + this.beatOffset) * this.beat;

            if (timeSinceStart >= 0 && timeSinceHit < 3000) {
                const progress = (timeSinceStart / this.beat) * this.songData.speed;
                const y = this.elements.pressArea.pressY * progress;

                this.drawNote(note.key, y, note.type);

                if (y > this.game.canvasManager.canvas.height + this.noteHeight) {
                    this.songData.notes.splice(i, 1);
                    i--;
                }
            } else if (timeSinceStart > 500) {
                break;
            }
        }
    }

    drawNote(key, y, type) {
        this.ctx.fillStyle = "#696";
        this.ctx.fillRect(this.getPosition(key), y, this.noteWidth, this.noteHeight);
    }

    getPosition(key) {
        let x = this.elements.pressArea.songArea.start + this.elements.pressArea.songArea.x * 0.5;

        switch (key) {
            case "ArrowLeft":
                return x;
            case "ArrowUp":
                return x + this.elements.pressArea.songArea.x * 25;
            case "ArrowDown":
                return x + this.elements.pressArea.songArea.x * 50;
            case "ArrowRight":
                return x + this.elements.pressArea.songArea.x * 75;
        }
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
}

export { SongManager };
