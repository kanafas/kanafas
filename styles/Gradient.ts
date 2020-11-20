import { Vector } from "../units/Vector.js";
import { IStyle } from "./IStyle.js";
import { IColorRGBA } from "./Color.js";
import { IRenderingLayer } from "../core/index.js";
import { IBoundingBox } from "../renderables/index.js";


export abstract class Gradient implements IGradient, IStyle {
    start: Vector;
    end: Vector;

    steps: IGradientStep[] = [];

    constructor(start: Vector, end: Vector, steps: IGradientStep[]) {
        this.start = start;
        this.end = end;
        this.steps = steps;
    }


    getStyle(renderingLayer: IRenderingLayer, boundingBox: IBoundingBox): string | CanvasGradient | CanvasPattern {
        throw new Error("Mehod `getStyle` is not implemented.");
    }
}


export interface IGradient {
    start: Vector;
    end: Vector;

    steps: IGradientStep[];
}


export interface IGradientStep {
    offset: number,
    color: IColorRGBA,
}