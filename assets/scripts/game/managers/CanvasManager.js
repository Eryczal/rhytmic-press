class CanvasManager {
    constructor(name) {
        this.canvas = document.getElementById(name);

        if (!this.canvas) {
            throw new Error("Canvas element not found");
        }

        this.ctx = this.canvas.getContext("2d");
    }

    writeText(text, x, y, size, color = "#fff", align = "center", baseline = "middle", font = "Verdana") {
        let lines = text.toString().split("\n");
        let sizes = [];

        this.ctx.font = size + "px " + font;
        this.ctx.textBaseline = baseline;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = align;

        for (let i = 0; i < lines.length; i++) {
            this.ctx.fillText(lines[i], x, y + i * size);
            sizes[i] = this.ctx.measureText(lines[i]);
        }

        return { sizes, lines: lines.length };
    }

    strokeText(text, x, y, size, color = "#000", align = "center", baseline = "middle", font = "Verdana") {
        let lines = text.toString().split("\n");

        this.ctx.font = size + "px " + font;
        this.ctx.textBaseline = baseline;
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = size / 8;
        this.ctx.textAlign = align;

        for (let i = 0; i < lines.length; i++) {
            this.ctx.strokeText(lines[i], x, y + i * size);
        }
    }
}

export { CanvasManager };
