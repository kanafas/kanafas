import { Color } from "../styles/Color.js";
import { IBoundingBox } from "../renderables/IBoundingBox.js";
import { IStyle } from "../styles/IStyle.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";
import { IClonable } from "../core/IClonable.js";


export class Fill implements IClonable<Fill> {

    style: IStyle;


    constructor(style: IStyle = Color.Grey) {
        this.style = style;
    }


    apply(renderingLayer: IRenderingLayer, boundingBox: IBoundingBox): void {
        const ctx = renderingLayer.getRenderingContext();

        ctx.fillStyle = this.style.getStyle(renderingLayer, boundingBox);
    }


    clone(): Fill {
        const thisStyle = this.style as any;
        const style = thisStyle.hasOwnProperty('clone') ? thisStyle.clone() : { ...this.style };

        return new Fill(style);
    }


    static clear(renderingLayer: IRenderingLayer) {
        const ctx = renderingLayer.getRenderingContext();

        ctx.fillStyle = 'transparent';
    }
}