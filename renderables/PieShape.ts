import { IRenderable } from "./IRenderable.js";
import { IShape } from "./IShape.js";
import { Fill } from "./../properties/Fill.js";
import { Stroke } from "./../properties/Stroke.js";
import { Shadow } from "./../properties/Shadow.js";
import { IRenderingLayer } from "./../core/RenderingLayer.js";
import { Helper } from "./Helper.js";
import { Vector } from "./../units/Vector.js";
import { Angle } from "./../units/Angle.js";
import { Gizmo } from "./../debugger/Gizmo.js";
import { PieGeometry } from "./PieGeometry.js";


export class PieShape extends PieGeometry implements IRenderable, IShape {

    fill: Fill | null = null;
    stroke: Stroke | null = null;
    shadow: Shadow | null = null;

    opacity: number = 1;


    constructor(width: number, height: number, startAngle: Angle, endAngle: Angle, innerRadius: number) {
        super(width, height, startAngle, endAngle, innerRadius);
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