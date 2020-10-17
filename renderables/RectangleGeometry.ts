import { Transform } from "./../properties/Transform.js";
import { Vector } from "./../units/Vector.js";
import { IBoundingBox } from "./IBoundingBox.js";
import { Geometry } from "./Geometry.js";
import { IClonable } from "../core/IClonable.js";


export class RectangleGeometry extends Geometry implements IClonable<RectangleGeometry> {

    width: number;
    height: number;


    constructor(width: number, height: number) {
        const d = (ctx: CanvasRenderingContext2D, pxs: number, t: Transform) => {
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


    clone(): RectangleGeometry {
        return new RectangleGeometry(this.width, this.height);
    }

}