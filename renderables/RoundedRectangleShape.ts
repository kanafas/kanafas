import { IRenderable } from "./IRenderable.js";
import { IShape } from "./IShape.js";
import { Fill } from "./../properties/Fill.js";
import { Stroke } from "./../properties/Stroke.js";
import { Shadow } from "./../properties/Shadow.js";
import { IRenderingLayer } from "./../core/RenderingLayer.js";
import { Shape } from "./Shape.js";
import { Vector } from "./../units/Vector.js";
import { Gizmo } from "./../debugger/Gizmo.js";
import { RoundedRectangleGeometry } from "./RoundedRectangleGeometry.js";


export class RoundedRectangleShape extends RoundedRectangleGeometry implements IRenderable, IShape {

    fill: Fill | null = null;
    stroke: Stroke | null = null;
    shadow: Shadow | null = null;

    opacity: number = 1;

    constructor(width: number, height: number, radius1: number | Vector, radius2?: number | Vector, radius3?: number | Vector, radius4?: number | Vector) {
        super(width, height, radius1, radius2, radius3, radius4);
    }


    render(renderingLayer: IRenderingLayer) {
        Shape.renderObject(renderingLayer, this, this, this);
    }


    renderGizmo(renderingLayer: IRenderingLayer) {
        Shape.renderGizmo(renderingLayer, this);
    }
}