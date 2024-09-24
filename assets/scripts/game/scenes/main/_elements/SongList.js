import { Element } from "../../../classes/Element.js";

class SongList extends Element {
    constructor(game) {
        super(game);
    }

    init() {
        this.selected = 0;

        this.songs = [
            {
                name: "377",
                difficulty: "łatwy",
            },
            {
                name: "451",
                difficulty: "trudny",
            },
        ];
    }

    draw() {
        if (!this.songs) {
            return;
        }

        this.canvasManager.writeText("Wybierz muzykę", this.sx * 50, this.sy * 5, this.sy * 4, "#fff");

        const previous = this.selected - 1 < 0 ? this.songs.length - 1 : this.selected - 1;
        const next = this.selected + 1 >= this.songs.length ? 0 : this.selected + 1;

        this.canvasManager.writeText(
            `Muzyka ${this.songs[previous].name}\nPoziom ${this.songs[previous].difficulty}`,
            this.sx * 50,
            this.sy * 40,
            this.sy * 3,
            "#ccc"
        );

        this.canvasManager.writeText(
            `Muzyka ${this.songs[this.selected].name}\nPoziom ${this.songs[this.selected].difficulty}`,
            this.sx * 50,
            this.sy * 50,
            this.sy * 4,
            "#fff"
        );

        this.canvasManager.writeText(`Muzyka ${this.songs[next].name}\nPoziom ${this.songs[next].difficulty}`, this.sx * 50, this.sy * 60, this.sy * 3, "#ccc");
    }

    onKeyUp(e) {
        switch (e.key) {
            case "ArrowUp":
                this.selected = this.selected - 1 < 0 ? this.songs.length - 1 : this.selected - 1;
                break;

            case "ArrowDown":
                this.selected = this.selected + 1 >= this.songs.length ? 0 : this.selected + 1;
                break;

            case "Enter":
                this.game.sceneManager.setScene("song", { song: this.songs[this.selected].name });
                break;
        }
    }
}

export { SongList };
