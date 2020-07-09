import { Color } from "../styles/Color.js";
import { IBoundingBox } from "../renderables/IBoundingBox.js";
import { IStyle } from "../styles/IStyle.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";


export class Fill {

    style: IStyle;


    constructor(style: IStyle = Color.grey()) {
        this.style = style;
    }


    apply(renderingLayer: IRenderingLayer, boundingBox: IBoundingBox): void {
        const ctx = renderingLayer.getRenderingContext();

        ctx.fillStyle = this.style.getStyle(renderingLayer, boundingBox);
    }


    static clear(renderingLayer: IRenderingLayer) {
        const ctx = renderingLayer.getRenderingContext();

        ctx.fillStyle = 'transparent';
    }
}