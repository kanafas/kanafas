import { Transform } from "./../properties/Transform.js";
import { Vector } from "./../units/Vector.js";
import { Utils } from "./../utils/Utils.js";
export class RoundedRectangleGeometry {
    constructor(width, height, radius1, radius2, radius3, radius4) {
        this.transform = new Transform();
        this.topLeftRadius = Vector.zero();
        this.topRightRadius = Vector.zero();
        this.bottomLeftRadius = Vector.zero();
        this.bottomRightRadius = Vector.zero();
        this.width = width;
        this.height = height;
        this.setRadius(radius1, radius2, radius3, radius4);
    }
    setRadius(radius1, radius2, radius3, radius4) {
        if (radius1 != undefined && radius2 != undefined && radius3 != undefined && radius4 != undefined) {
            this.setTopLeftRadius(radius1);
            this.setTopRightRadius(radius2);
            this.setBottomRightRadius(radius3);
            this.setBottomLeftRadius(radius4);
        }
        else if (radius1 != undefined && radius2 != undefined && radius3 == undefined && radius4 == undefined) {
            this.setTopLeftRadius(radius1);
            this.setTopRightRadius(radius2);
            this.setBottomRightRadius(radius1);
            this.setBottomLeftRadius(radius2);
        }
        else if (radius1 != undefined && radius2 == undefined && radius3 == undefined && radius4 == undefined) {
            this.setTopLeftRadius(radius1);
            this.setTopRightRadius(radius1);
            this.setBottomRightRadius(radius1);
            this.setBottomLeftRadius(radius1);
        }
        else {
            throw new Error("Incorrect combination of agruments");
        }
    }
    setTopLeftRadius(value) {
        if (value instanceof Vector) {
            this.topLeftRadius = value.clone();
        }
        else {
            this.topLeftRadius.x = value;
            this.topLeftRadius.y = value;
        }
    }
    setTopRightRadius(value) {
        if (value instanceof Vector) {
            this.topRightRadius = value.clone();
        }
        else {
            this.topRightRadius.x = value;
            this.topRightRadius.y = value;
        }
    }
    setBottomRightRadius(value) {
        if (value instanceof Vector) {
            this.bottomRightRadius = value.clone();
        }
        else {
            this.bottomRightRadius.x = value;
            this.bottomRightRadius.y = value;
        }
    }
    setBottomLeftRadius(value) {
        if (value instanceof Vector) {
            this.bottomLeftRadius = value.clone();
        }
        else {
            this.bottomLeftRadius.x = value;
            this.bottomLeftRadius.y = value;
        }
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
        const r1 = this.topLeftRadius.clone();
        r1.multiple(Utils.Numbers.limit(r1.x, 0, width / 2) / r1.x);
        r1.multiple(Utils.Numbers.limit(r1.y, 0, height / 2) / r1.y);
        const r2 = this.topRightRadius.clone();
        r2.multiple(Utils.Numbers.limit(r2.x, 0, width / 2) / r2.x);
        r2.multiple(Utils.Numbers.limit(r2.y, 0, height / 2) / r2.y);
        const r3 = this.bottomRightRadius.clone();
        r3.multiple(Utils.Numbers.limit(r3.x, 0, width / 2) / r3.x);
        r3.multiple(Utils.Numbers.limit(r3.y, 0, height / 2) / r3.y);
        const r4 = this.bottomLeftRadius.clone();
        r4.multiple(Utils.Numbers.limit(r4.x, 0, width / 2) / r4.x);
        r4.multiple(Utils.Numbers.limit(r4.y, 0, height / 2) / r4.y);
        ctx.beginPath();
        ctx.moveTo(-t.origin.x * pxs, -t.origin.y * pxs);
        ctx.moveTo(0, r1.y * pxs);
        ctx.ellipse(r1.x * pxs, r1.y * pxs, r1.x * pxs, r1.y * pxs, Math.PI, 0, Math.PI / 2);
        ctx.ellipse((width - r2.x) * pxs, r2.y * pxs, r2.y * pxs, r2.x * pxs, Math.PI * 1.5, 0, Math.PI / 2);
        ctx.ellipse((width - r3.x) * pxs, (height - r3.y) * pxs, r3.x * pxs, r3.y * pxs, Math.PI * 2, 0, Math.PI / 2);
        ctx.ellipse(r4.x * pxs, (height - r4.y) * pxs, r4.y * pxs, r4.x * pxs, Math.PI * .5, 0, Math.PI / 2);
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