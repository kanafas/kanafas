import { Color as UnitColor } from "../units/Color.js";
import { IStyle } from "./IStyle.js";
import { IBoxArea } from "../renderables/IArea.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";


export class Color extends UnitColor implements IStyleColor {

    getStyle(): string {
        return `rgba(${this.red.toFixed(3)}, ${this.green.toFixed(3)}, ${this.blue.toFixed(3)}, ${this.alpha.toFixed(3)})`;
    }

}


export interface IStyleColor extends IStyle {
    red: number,
    green: number,
    blue: number,
    alpha: number,

    getStyle(renderingLayer: IRenderingLayer, boundingBox: IBoxArea): string,
}