import { IVector, Vector } from "./Vector.js";

export class BezierPoint extends Vector {

    startControl: Vector;
    endControl: Vector;


    constructor(position: IVector, startControl: IVector = Vector.zero(), endControl: IVector = Vector.zero()) {
        super(position.x, position.y);

        this.startControl = new Vector(startControl.x, startControl.y);
        this.endControl = new Vector(endControl.x, endControl.y);
    }


    toVector(): Vector {
        return new Vector(this.x, this.y);
    }
}