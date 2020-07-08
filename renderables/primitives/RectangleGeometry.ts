import { IGeometry } from "../IGeometry.js";
import { Transform } from "../../properties/Transform.js";
import { Vector } from "../../units/units.js";
import { IRenderingLayer } from "../../core/RenderingLayer.js";
import { IBoxArea } from "../IArea.js";


export class RectangleGeometry implements IGeometry {
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

        const width = this.width > 0 ? this.width : 0;
        const height = this.height > 0 ? this.height : 0;

        ctx.beginPath();
        ctx.rect(
            -t.origin.x * pxs,
            -t.origin.y * pxs,
            width * pxs,
            height * pxs
        );
        ctx.closePath();
    }


    draw(renderingLayer: IRenderingLayer) {
        this.contructMatrix(renderingLayer);
        this.drawWithoutMatrixManipulation(renderingLayer);
        this.destructMatrix(renderingLayer);
    }


    getBoundingBox(renderingLayer: IRenderingLayer): IBoxArea {
        return {
            origin: this.transform.origin.clone(),
            size: new Vector(this.width, this.height),
        }
    }
}