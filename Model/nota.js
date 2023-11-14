class Note {
    constructor(text, coordX = 100, coordY = 100, color,id) {
        this.text = text;
        this.coordX = coordX;
        this.coordY = coordY;
        this.color=color;
        this.id=id;
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

    getId() {
        return this.id;
    }

    setId(newId) {
        this.id = newId;
    }

    getColor() {
        return this.color;
    }

    setColor(newColor) {
        this.color = newColor;
    }

    toString() {
        console.log(`Note: ${this.text}, Coordinates: (${this.coordX}, ${this.coordY})`);
    }
}

