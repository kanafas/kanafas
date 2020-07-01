import { Vector } from "../units/Vector.js";
import { IStyle } from "./Style.js";
import { IStyleColor } from "./Color.js";


export interface IGradientStep {
    offset: number,
    color: IStyleColor,
}


export interface IGradient extends IStyle {
    start: Vector;
    end: Vector;

    steps: IGradientStep[];
}