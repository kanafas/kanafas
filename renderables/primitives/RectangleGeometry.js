import { Transform } from "../../properties/Transform.js";
import { Vector } from "../../units/units.js";
export class RectangleGeometry {
    constructor(width, height) {
        this.transform = new Transform();
        this.width = width;
        this.height = height;
    }
    contructMatrix(renderingLayer) {
        const t = this.transform;
        renderingLayer.setMatrixToTransform(t);
    }
    destructMatrix(renderingLayer) {
        renderingLayer.resetMatrix();
    }
    drawWithoutMatrixManipulation(renderingLayer) {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;
        const t = this.transform;
        const width = this.width > 0 ? this.width : 0;
        const height = this.height > 0 ? this.height : 0;
        ctx.beginPath();
        ctx.rect(-t.origin.x * pxs, -t.origin.y * pxs, width * pxs, height * pxs);
        ctx.closePath();
    }
    draw(renderingLayer) {
        this.contructMatrix(renderingLayer);
        this.drawWithoutMatrixManipulation(renderingLayer);
        this.destructMatrix(renderingLayer);
    }
    getBoundingBox(renderingLayer) {
        return {
            origin: this.transform.origin.clone(),
            size: new Vector(this.width, this.height),
        };
    }
}
