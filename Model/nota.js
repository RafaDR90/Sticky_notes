class Note {
    constructor(text, coordX = 100, coordY = 100) {
        this.text = text;
        this.coordX = coordX;
        this.coordY = coordY;
    }

    getText() {
        return this.text;
    }

    setText(newText) {
        this.text = newText;
    }

    getCoordX() {
        return this.coordX;
    }

    setCoordX(newCoordX) {
        this.coordX = newCoordX;
    }

    getCoordY() {
        return this.coordY;
    }

    setCoordY(newCoordY) {
        this.coordY = newCoordY;
    }

    toString() {
        console.log(`Note: ${this.text}, Coordinates: (${this.coordX}, ${this.coordY})`);
    }
}

