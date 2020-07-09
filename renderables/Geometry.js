import { Transform } from "./../properties/Transform.js";
export class Geometry {
    constructor(draw, getBoundingBox) {
        this.transform = new Transform();
        this._drawWithoutMatrixManipulation = draw;
        this._getBoundingBox = getBoundingBox;
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
        this._drawWithoutMatrixManipulation(ctx, pxs, t);
    }
    draw(renderingLayer) {
        this.contructMatrix(renderingLayer);
        this.drawWithoutMatrixManipulation(renderingLayer);
        this.destructMatrix(renderingLayer);
    }
    getBoundingBox(renderingLayer) {
        return this._getBoundingBox(this.transform);
    }
}
