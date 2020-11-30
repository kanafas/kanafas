import { Color } from "../styles/Color.js";
import { IBoundingBox } from "../renderables/IBoundingBox.js";
import { Style, EntryType_Style } from "../styles/Style.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";
import { IClonable } from "../core/IClonable.js";


export class Fill extends Style implements IClonable<Fill> {


    constructor(style: EntryType_Style = Color.Grey) {
        super(style);
    }


    apply(renderingLayer: IRenderingLayer, boundingBox: IBoundingBox): void {
        const ctx = renderingLayer.getRenderingContext();

        ctx.fillStyle = this.computeStyle(renderingLayer, boundingBox);
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