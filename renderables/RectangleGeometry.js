import { Vector } from "./../units/Vector.js";
import { Geometry } from "./Geometry.js";
export class RectangleGeometry extends Geometry {
    constructor(width, height) {
        const d = (ctx, pxs, t) => {
            const width = this.width > 0 ? this.width : 0;
            const height = this.height > 0 ? this.height : 0;
            ctx.beginPath();
            ctx.rect(-t.origin.x * pxs, -t.origin.y * pxs, width * pxs, height * pxs);
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
    }
    clone() {
        return new RectangleGeometry(this.width, this.height);
    }
}
