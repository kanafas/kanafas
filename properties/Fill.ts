import { IRenderingLayer } from "../RenderingLayer.js";
import { IBoxArea } from "../renderables/types.js";
import { IStyle } from "../styles/Style.js";
import { Color } from "../styles/Color.js";

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