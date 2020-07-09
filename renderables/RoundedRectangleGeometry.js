import { Vector } from "./../units/Vector.js";
import { Numbers } from "./../utils/Numbers.js";
import { Geometry } from "./Geometry.js";
export class RoundedRectangleGeometry extends Geometry {
    constructor(width, height, radius1 = 0, radius2, radius3, radius4) {
        const d = (ctx, pxs, t) => {
            const width = (this.width > 0 ? this.width : 0);
            const height = (this.height > 0 ? this.height : 0);
            const r1 = this.topLeftRadius.clone();
            if (r1.x > 0 && r1.y > 0) {
                r1.multiple(Numbers.limit(r1.x, 0, width / 2) / r1.x);
                r1.multiple(Numbers.limit(r1.y, 0, height / 2) / r1.y);
            }
            const r2 = this.topRightRadius.clone();
            if (r2.x > 0 && r2.y > 0) {
                r2.multiple(Numbers.limit(r2.x, 0, width / 2) / r2.x);
                r2.multiple(Numbers.limit(r2.y, 0, height / 2) / r2.y);
            }
            const r3 = this.bottomRightRadius.clone();
            if (r3.x > 0 && r3.y > 0) {
                r3.multiple(Numbers.limit(r3.x, 0, width / 2) / r3.x);
                r3.multiple(Numbers.limit(r3.y, 0, height / 2) / r3.y);
            }
            const r4 = this.bottomLeftRadius.clone();
            if (r4.x > 0 && r4.y > 0) {
                r4.multiple(Numbers.limit(r4.x, 0, width / 2) / r4.x);
                r4.multiple(Numbers.limit(r4.y, 0, height / 2) / r4.y);
            }
            ctx.translate(-t.origin.x * pxs, -t.origin.y * pxs);
            ctx.beginPath();
            ctx.moveTo(0, r1.y * pxs);
            ctx.ellipse(r1.x * pxs, r1.y * pxs, r1.x * pxs, r1.y * pxs, Math.PI, 0, Math.PI / 2);
            ctx.ellipse((width - r2.x) * pxs, r2.y * pxs, r2.y * pxs, r2.x * pxs, Math.PI * 1.5, 0, Math.PI / 2);
            ctx.ellipse((width - r3.x) * pxs, (height - r3.y) * pxs, r3.x * pxs, r3.y * pxs, Math.PI * 2, 0, Math.PI / 2);
            ctx.ellipse(r4.x * pxs, (height - r4.y) * pxs, r4.y * pxs, r4.x * pxs, Math.PI * .5, 0, Math.PI / 2);
            ctx.closePath();
        };
        const b = (t) => {
            return {
                origin: t.origin.clone(),
                size: new Vector(this.width, this.height),
            };
        };
        super(d, b);
        this.width = width;
        this.height = height;
        this.topLeftRadius = Vector.zero();
        this.topRightRadius = Vector.zero();
        this.bottomLeftRadius = Vector.zero();
        this.bottomRightRadius = Vector.zero();
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
}
