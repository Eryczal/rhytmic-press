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

    draw() {
        for (let elem in this.elements) {
            this.elements[elem]?.draw();
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
