export class Gradient {
    constructor(start, end, steps) {
        this.steps = [];
        this.start = start;
        this.end = end;
        this.steps = steps;
    }
    computeStyle(renderingLayer, boundingBox) {
        throw new Error("Mehod `getStyle` is not implemented.");
    }
}
