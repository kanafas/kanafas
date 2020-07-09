import { IVector } from "../units/Vector.js";


export interface IArea { }

export interface IBoxArea extends IArea {
    origin: IVector,
    size: IVector,
}