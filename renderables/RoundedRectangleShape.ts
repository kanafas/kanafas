import { IRenderingLayer } from "../RenderingLayer.js";
import { RoundedRectangleGeometry } from "./RoundedRectangleGeometry.js";
import { Vector } from "../units/Vector.js";
import { Helper } from "./Helper.js";
import { Fill } from "../properties/Fill.js";
import { Shadow } from "../properties/Shadow.js";
import { Stroke } from "../properties/Stroke.js";
import { Gizmo } from "./Gizmo.js";
import { IObject } from "./IObject.js";
import { IRenderable } from "./IRenderable.js";
import { IShape } from "./IShape.js";


export class RoundedRectangleShape extends RoundedRectangleGeometry implements IObject, IRenderable, IShape {

    fill: Fill | null = null;
    stroke: Stroke | null = null;
    shadow: Shadow | null = null;

    opacity: number = 1;

    constructor(width: number, height: number, radius1: number | Vector, radius2?: number | Vector, radius3?: number | Vector, radius4?: number | Vector) {
        super(width, height, radius1, radius2, radius3, radius4);
    }


    render(renderingLayer: IRenderingLayer) {
        Helper.render(renderingLayer, this, this, this);
    }


    renderGizmos(renderingLayer: IRenderingLayer) {
        renderingLayer.setMatrixToTransform(this.transform);
        Gizmo.origin(renderingLayer, Vector.zero(), Gizmo.shapeColor);
        renderingLayer.resetMatrix();
    }
}