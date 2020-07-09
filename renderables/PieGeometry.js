import { Vector } from "./../units/Vector.js";
import { Utils } from "./../utils/Utils.js";
import { Geometry } from "./Geometry.js";
export class PieGeometry extends Geometry {
    constructor(width, height, startAngle, endAngle, innerRadius) {
        const d = (ctx, pxs, t) => {
            const width = this.width > 0 ? this.width : 0;
            const height = this.height > 0 ? this.height : 0;
            const x = -t.origin.x + width / 2;
            const y = -t.origin.y + height / 2;
            const radiusX = width / 2;
            const radiusY = height / 2;
            const innerRadius = Utils.Numbers.limit(this.innerRadius, 0, 1);
            const innerRadiusX = radiusX * innerRadius;
            const innerRadiusY = radiusY * innerRadius;
            let startAngle = this.startAngle.radians - Math.PI / 2;
            let endAngle = this.endAngle.radians - Math.PI / 2;
            if (endAngle - startAngle > Math.PI * 2) {
                endAngle = Math.PI * 2 + startAngle;
            }
            ctx.beginPath();
            ctx.ellipse(x * pxs, y * pxs, radiusX * pxs, radiusY * pxs, 0, startAngle, endAngle);
            ctx.ellipse(x * pxs, y * pxs, innerRadiusX * pxs, innerRadiusY * pxs, 0, endAngle, startAngle, true);
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
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.innerRadius = innerRadius;
    }
}
