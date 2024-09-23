class ElementHolder {
    constructor(game) {
        this.game = game;
        this.elements = {};
    }

    get list() {
        return this.elements;
    }

    addElement(id, elem) {
        this.elements[id] = elem;
    }

    removeElement(id) {
        delete this.elements[id];
    }

    init() {
        for (let elem in this.elements) {
            this.elements[elem]?.init();
        }
    }

    draw() {
        for (let elem in this.elements) {
            this.elements[elem]?.draw();
        }
    }

    onResize() {
        for (let elem in this.elements) {
            this.elements[elem]?.onResize();
        }
    }

    onKeyUp(e) {
        for (let elem in this.elements) {
            this.elements[elem]?.onKeyUp(e);
        }
    }

    onKeyDown(e) {
        for (let elem in this.elements) {
            this.elements[elem]?.onKeyDown(e);
        }
    }
}

export { ElementHolder };
