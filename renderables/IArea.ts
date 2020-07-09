import { Vector } from "../units/Vector.js";


export interface IArea { }

export interface IBoxArea extends IArea {
    origin: Vector,
    size: Vector,
}