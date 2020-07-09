import { IGeometry } from "./IGeometry.js";
import { Transform } from "./../properties/Transform.js";
import { Vector } from "./../units/Vector.js";
import { IBoundingBox } from "./IBoundingBox.js";
import { Geometry } from "./Geometry.js";


export class EllipseGeometry extends Geometry {

    width: number;
    height: number;

    constructor(width: number, height: number) {
        const d = (ctx: CanvasRenderingContext2D, pxs: number, t: Transform) => {
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

        const b = (t: Transform): IBoundingBox => {
            return {
                origin: t.origin.clone(),
                size: new Vector(this.width, this.height),
            }
        }

        super(d, b);

        this.width = width;
        this.height = height;
    }
}