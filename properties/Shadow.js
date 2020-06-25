import { Vector } from "../node_modules/kanafas-units/Vector.js";
import { Color } from "../styles/Color.js";
export class Shadow {
    constructor(color, offset, blur) {
        this.color = Color.black();
        this.offset = Vector.zero();
        this.blur = 0;
        this.color = color;
        this.offset = offset;
        this.blur = blur;
    }
    apply(renderingLayer, boundingBox) {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;
        ctx.shadowColor = this.color.getStyle(renderingLayer, boundingBox);
        ctx.shadowBlur = this.blur * pxs;
        ctx.shadowOffsetX = this.offset.x * pxs;
        ctx.shadowOffsetY = this.offset.y * pxs;
    }
    static clear(renderingLayer) {
        const ctx = renderingLayer.getRenderingContext();
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }
}
