import { IBoxArea } from "../renderables/types.js";
import { IStyle } from "../styles/Style.js";
import { Color } from "../styles/Color.js";
import { IRenderingLayer } from "../RenderingLayer.js";


export class Stroke {

    style: IStyle;

    lineWidth: number;
    lineJoin: CanvasLineJoin;
    lineCap: CanvasLineCap;
    lineDashOffset: number;
    miterLimit: number;


    constructor(style: IStyle = Color.black(), lineWidth: number = 1, lineJoin: CanvasLineJoin = 'miter', lineCap: CanvasLineCap = 'square', lineDashOffset: number = 0, miterLimit = 10) {
        this.style = style;

        this.lineWidth = lineWidth;
        this.lineJoin = lineJoin;
        this.lineCap = lineCap;
        this.lineDashOffset = lineDashOffset;
        this.miterLimit = miterLimit;
    }


    apply(renderingLayer: IRenderingLayer, boundingBox: IBoxArea): void {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;

        ctx.lineWidth = this.lineWidth * pxs;
        ctx.lineDashOffset = this.lineDashOffset * pxs;
        ctx.lineJoin = this.lineJoin;
        ctx.lineCap = this.lineCap;
        ctx.miterLimit = this.miterLimit * pxs;

        ctx.strokeStyle = this.style.getStyle(renderingLayer, boundingBox);
    }


    static clear(renderingLayer: IRenderingLayer) {
        const ctx = renderingLayer.getRenderingContext();

        ctx.lineWidth = 0;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineDashOffset = 0;
        ctx.miterLimit = 10;

        ctx.strokeStyle = 'transparent';
    }
}