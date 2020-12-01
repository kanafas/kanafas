import { Color } from "../styles/Color.js";
import { Style } from "../styles/Style.js";
export class Stroke extends Style {
    constructor(style = Color.Black, lineWidth = 1, lineJoin = 'miter', lineCap = 'square', lineDashOffset = 0, miterLimit = 10) {
        super(style);
        this.lineWidth = lineWidth;
        this.lineJoin = lineJoin;
        this.lineCap = lineCap;
        this.lineDashOffset = lineDashOffset;
        this.miterLimit = miterLimit;
    }
    apply(renderingLayer, boundingBox) {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;
        ctx.lineWidth = this.lineWidth * pxs;
        ctx.lineDashOffset = this.lineDashOffset * pxs;
        ctx.lineJoin = this.lineJoin;
        ctx.lineCap = this.lineCap;
        ctx.miterLimit = this.miterLimit * pxs;
        ctx.strokeStyle = this.computeStyle(renderingLayer, boundingBox);
    }
    clone() {
        const style = super.clone();
        return new Stroke(style, this.lineWidth, this.lineJoin, this.lineCap, this.lineDashOffset, this.miterLimit);
    }
    static clear(renderingLayer) {
        const ctx = renderingLayer.getRenderingContext();
        ctx.lineWidth = 0;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineDashOffset = 0;
        ctx.miterLimit = 10;
        ctx.strokeStyle = 'transparent';
    }
}
