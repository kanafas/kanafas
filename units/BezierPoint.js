import { Vector } from "./Vector.js";
export class BezierPoint extends Vector {
    constructor(position, startControl = Vector.zero(), endControl = Vector.zero()) {
        super(position.x, position.y);
        this.startControl = new Vector(startControl.x, startControl.y);
        this.endControl = new Vector(endControl.x, endControl.y);
    }
    toVector() {
        return new Vector(this.x, this.y);
    }
    clone() {
        const startControl = this.startControl.clone();
        const endControl = this.endControl.clone();
        return new BezierPoint({ x: this.x, y: this.y }, startControl, endControl);
    }
}
