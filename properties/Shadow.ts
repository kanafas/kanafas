import { IBoundingBox } from "../renderables/IBoundingBox.js";
import { IColorRGBA, Color } from "../styles/Color.js";
import { Vector } from "../units/Vector.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";
import { IClonable } from "../core/IClonable.js";


export class Shadow implements IClonable<Shadow> {

    color: IColorRGBA = Color.Black;
    offset: Vector = Vector.Zero;
    blur: number = 0;


    constructor(color: IColorRGBA, offset: Vector, blur: number) {
        this.color = color;
        this.offset = offset;
        this.blur = blur;
    }


    apply(renderingLayer: IRenderingLayer, boundingBox: IBoundingBox): void {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;

        ctx.shadowColor = Color.convertRGBAtoStyle(this.color);
        ctx.shadowBlur = this.blur * pxs;
        ctx.shadowOffsetX = this.offset.x * pxs;
        ctx.shadowOffsetY = this.offset.y * pxs;
    }


    clone(): Shadow {
        const thisColor = this.color as any;
        const color = thisColor.hasOwnProperty('clone') ? thisColor.clone() : { ...this.color };

        return new Shadow(color, this.offset.clone(), this.blur);
    }


    static clear(renderingLayer: IRenderingLayer) {
        const ctx = renderingLayer.getRenderingContext();

        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }
}