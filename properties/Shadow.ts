import { IBoundingBox } from "../renderables/IBoundingBox.js";
import { IStyleColor, Color } from "../styles/Color.js";
import { Vector } from "../units/Vector.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";


export class Shadow {

    color: IStyleColor = Color.black();
    offset: Vector = Vector.zero();
    blur: number = 0;


    constructor(color: IStyleColor, offset: Vector, blur: number) {
        this.color = color;
        this.offset = offset;
        this.blur = blur;
    }


    apply(renderingLayer: IRenderingLayer, boundingBox: IBoundingBox): void {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;

        ctx.shadowColor = this.color.getStyle(renderingLayer, boundingBox);
        ctx.shadowBlur = this.blur * pxs;
        ctx.shadowOffsetX = this.offset.x * pxs;
        ctx.shadowOffsetY = this.offset.y * pxs;
    }


    static clear(renderingLayer: IRenderingLayer) {
        const ctx = renderingLayer.getRenderingContext();

        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }
}