import { Color } from "../styles/Color.js";
import { IBoundingBox } from "../renderables/IBoundingBox.js";
import { IStyle } from "../styles/IStyle.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";
import { IClonable } from "../core/IClonable.js";


export class Stroke implements IClonable<Stroke> {

    style: IStyle;

    lineWidth: number;
    lineJoin: CanvasLineJoin;
    lineCap: CanvasLineCap;
    lineDashOffset: number;
    miterLimit: number;


    constructor(style: IStyle = Color.black, lineWidth: number = 1, lineJoin: CanvasLineJoin = 'miter', lineCap: CanvasLineCap = 'square', lineDashOffset: number = 0, miterLimit = 10) {
        this.style = style;

        this.lineWidth = lineWidth;
        this.lineJoin = lineJoin;
        this.lineCap = lineCap;
        this.lineDashOffset = lineDashOffset;
        this.miterLimit = miterLimit;
    }


    apply(renderingLayer: IRenderingLayer, boundingBox: IBoundingBox): void {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;

        ctx.lineWidth = this.lineWidth * pxs;
        ctx.lineDashOffset = this.lineDashOffset * pxs;
        ctx.lineJoin = this.lineJoin;
        ctx.lineCap = this.lineCap;
        ctx.miterLimit = this.miterLimit * pxs;

        ctx.strokeStyle = this.style.getStyle(renderingLayer, boundingBox);
    }


    clone(): Stroke {
        const thisStyle = this.style as any;
        const style = thisStyle.hasOwnProperty('clone') ? thisStyle.clone() : { ...this.style };

        return new Stroke(style, this.lineWidth, this.lineJoin, this.lineCap, this.lineDashOffset, this.miterLimit);
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