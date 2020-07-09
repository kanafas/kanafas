import { IBoundingBox } from "../renderables/IBoundingBox.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";


export interface IStyle {
    getStyle(renderingLayer: IRenderingLayer, boundingBox: IBoundingBox): string | CanvasGradient | CanvasPattern,
}