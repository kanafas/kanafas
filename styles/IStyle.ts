import { IBoxArea } from "../renderables/IArea.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";


export interface IStyle {
    getStyle(renderingLayer: IRenderingLayer, boundingBox: IBoxArea): string | CanvasGradient | CanvasPattern,
}