import { IRenderingLayer } from "../RenderingLayer.js";
import { IBoxArea } from "../renderables/types.js";


export interface IStyle {
    getStyle(renderingLayer: IRenderingLayer, boundingBox: IBoxArea): string|CanvasGradient|CanvasPattern,
}