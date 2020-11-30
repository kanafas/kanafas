import { Color } from "../styles/Color.js";
import { IBoundingBox } from "../renderables/IBoundingBox.js";
import { IStyle, Style } from "../styles/Style.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";
import { IClonable } from "../core/IClonable.js";


export class Fill extends Style implements IClonable<Fill> {

    constructor(style: IStyle | string | CanvasGradient | CanvasPattern = Color.Grey) {
        super(style);
    }


    apply(renderingLayer: IRenderingLayer, boundingBox: IBoundingBox): void {
        const ctx = renderingLayer.getRenderingContext();

        ctx.fillStyle = this.getStyle(renderingLayer, boundingBox);
    }


    clone(): Fill {
        const style = super.clone();

        return new Fill(style);
    }


    static clear(renderingLayer: IRenderingLayer) {
        const ctx = renderingLayer.getRenderingContext();

        ctx.fillStyle = 'transparent';
    }
}