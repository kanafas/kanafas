import { Transform } from "../properties/Transform.js";
import { Vector } from "../units/Vector.js";
export class EllipseGeometry {
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
        const width = (this.width > 0 ? this.width : 0);
        const height = (this.height > 0 ? this.height : 0);
        const x = -t.origin.x + width / 2;
        const y = -t.origin.y + height / 2;
        const radiusX = width / 2;
        const radiusY = height / 2;
        ctx.beginPath();
        ctx.ellipse(x * pxs, y * pxs, radiusX * pxs, radiusY * pxs, 0, 0, 2 * Math.PI);
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
