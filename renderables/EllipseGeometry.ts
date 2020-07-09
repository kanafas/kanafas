import { IGeometry } from "./IGeometry.js";
import { Transform } from "./../properties/Transform.js";
import { Vector } from "./../units/Vector.js";
import { IRenderingLayer } from "./../core/RenderingLayer.js";
import { IBoundingBox } from "./IBoundingBox.js";


export class EllipseGeometry implements IGeometry {
    transform: Transform = new Transform();

    width: number;
    height: number;


    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }


    contructMatrix(renderingLayer: IRenderingLayer) {
        const t = this.transform;

        renderingLayer.setMatrixToTransform(t);
    }


    destructMatrix(renderingLayer: IRenderingLayer) {
        renderingLayer.resetMatrix();
    }


    drawWithoutMatrixManipulation(renderingLayer: IRenderingLayer) {
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
        ctx.ellipse(
            x * pxs,
            y * pxs,
            radiusX * pxs,
            radiusY * pxs,
            0, 0, 2 * Math.PI
        );
        ctx.closePath();
    }


    draw(renderingLayer: IRenderingLayer) {
        this.contructMatrix(renderingLayer);
        this.drawWithoutMatrixManipulation(renderingLayer);
        this.destructMatrix(renderingLayer);
    }


    getBoundingBox(renderingLayer: IRenderingLayer): IBoundingBox {
        return {
            origin: this.transform.origin.clone(),
            size: new Vector(this.width, this.height),
        }
    }

}