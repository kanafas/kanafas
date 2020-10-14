import { Color } from "../styles/Color.js";
export class Fill {
    constructor(style = Color.grey()) {
        this.style = style;
    }
    apply(renderingLayer, boundingBox) {
        const ctx = renderingLayer.getRenderingContext();
        ctx.fillStyle = this.style.getStyle(renderingLayer, boundingBox);
    }
    clone() {
        const thisStyle = this.style;
        const style = thisStyle.hasOwnProperty('clone') ? thisStyle.clone() : { ...this.style };
        return new Fill(style);
    }
    static clear(renderingLayer) {
        const ctx = renderingLayer.getRenderingContext();
        ctx.fillStyle = 'transparent';
    }
}
