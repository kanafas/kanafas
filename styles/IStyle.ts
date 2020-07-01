import { IRenderingLayer } from "../RenderingLayer.js";
import { IBoxArea } from "../renderables/IArea.js";


export interface IStyle {
    getStyle(renderingLayer: IRenderingLayer, boundingBox: IBoxArea): string | CanvasGradient | CanvasPattern,
}