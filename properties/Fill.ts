import { Color } from "../styles/Color.js";
import { IBoxArea } from "../renderables/IArea.js";
import { IRenderingLayer } from "../RenderingLayer.js";
import { IStyle } from "../styles/IStyle.js";


export class Fill {

    style: IStyle;


    constructor(style: IStyle = Color.grey()) {
        this.style = style;
    }


    apply(renderingLayer: IRenderingLayer, boundingBox: IBoxArea): void {
        const ctx = renderingLayer.getRenderingContext();

        ctx.fillStyle = this.style.getStyle(renderingLayer, boundingBox);
    }


    static clear(renderingLayer: IRenderingLayer) {
        const ctx = renderingLayer.getRenderingContext();

        ctx.fillStyle = 'transparent';
    }
}