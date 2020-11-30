import { Vector } from "./../units/Vector.js";
import { Numbers } from "./../utils/Numbers.js";
import { Geometry } from "./Geometry.js";
export class RoundedRectangleGeometry extends Geometry {
    constructor(width, height, ...radius) {
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
        this.topLeftRadius = Vector.zero;
        this.topRightRadius = Vector.zero;
        this.bottomLeftRadius = Vector.zero;
        this.bottomRightRadius = Vector.zero;
        this.setRadius(...radius);
    }
    setRadius(...radius) {
        if (radius.length == 4) {
            this.setTopLeftRadius(radius[0]);
            this.setTopRightRadius(radius[1]);
            this.setBottomRightRadius(radius[2]);
            this.setBottomLeftRadius(radius[3]);
        }
        else if (radius.length == 3) {
            this.setTopLeftRadius(radius[0]);
            this.setTopRightRadius(radius[1]);
            this.setBottomRightRadius(radius[2]);
            this.setBottomLeftRadius(radius[1]);
        }
        else if (radius.length == 2) {
            this.setTopLeftRadius(radius[0]);
            this.setTopRightRadius(radius[1]);
            this.setBottomRightRadius(radius[0]);
            this.setBottomLeftRadius(radius[1]);
        }
        else if (radius.length == 1) {
            const v = radius[0];
            this.setTopLeftRadius(radius[0]);
            this.setTopRightRadius(radius[0]);
            this.setBottomRightRadius(radius[0]);
            this.setBottomLeftRadius(radius[0]);
        }
        else {
            throw new Error("Incorrect combination of agruments");
        }
    }
    setTopLeftRadius(...values) {
        const radius = RoundedRectangleGeometry._parseRadiusValue(...values);
        this.topLeftRadius.x = radius.x;
        this.topLeftRadius.y = radius.y;
    }
    setTopRightRadius(...values) {
        const radius = RoundedRectangleGeometry._parseRadiusValue(...values);
        this.topRightRadius.x = radius.x;
        this.topRightRadius.y = radius.y;
    }
    setBottomRightRadius(...values) {
        const radius = RoundedRectangleGeometry._parseRadiusValue(...values);
        this.bottomRightRadius.x = radius.x;
        this.bottomRightRadius.y = radius.y;
    }
    setBottomLeftRadius(...values) {
        const radius = RoundedRectangleGeometry._parseRadiusValue(...values);
        this.bottomLeftRadius.x = radius.x;
        this.bottomLeftRadius.y = radius.y;
    }
    static _parseRadiusValue(...values) {
        let x;
        let y;
        if (values.length == 2) {
            x = values[0];
            y = values[1];
        }
        else if (typeof values[0] == 'number') {
            x = values[0];
            y = values[0];
        }
        else {
            x = values[0].x;
            y = values[0].y;
        }
        return { x, y };
    }
    clone() {
        const topLeftRadius = { x: this.topLeftRadius.x, y: this.topLeftRadius.y };
        const topRightRadius = { x: this.topRightRadius.x, y: this.topRightRadius.y };
        const bottomRightRadius = { x: this.bottomRightRadius.x, y: this.bottomRightRadius.y };
        const bottomLeftRadius = { x: this.bottomLeftRadius.x, y: this.bottomLeftRadius.y };
        const geometry = new RoundedRectangleGeometry(this.width, this.height, topLeftRadius, topRightRadius, bottomRightRadius, bottomLeftRadius);
        return geometry;
    }
}
