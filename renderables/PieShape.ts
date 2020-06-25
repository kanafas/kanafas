import { Vector } from "../node_modules/kanafas-units/Vector.js";
import { Angle } from "../node_modules/kanafas-units/Angle.js";
import { Stroke } from "../properties/Stroke.js";
import { Fill } from "../properties/Fill.js";
import { Shadow } from "../properties/Shadow.js";
import { PieGeometry } from "./PieGeometry.js";
import { Helper } from "./Helper.js";
import { Gizmo } from "./Gizmo.js";
import { IRenderingLayer } from "../RenderingLayer.js";
import { IObject, IRenderable, IShape } from "./types.js";


export class PieShape extends PieGeometry implements IObject, IRenderable, IShape {

    fill: Fill|null = null;
    stroke: Stroke|null = null;
    shadow: Shadow|null = null;

    opacity: number = 1;


    constructor(width: number, height: number, startAngle: Angle, endAngle: Angle, innerRadius: number) {
        super(width, height, startAngle, endAngle, innerRadius);
    }


    render(renderingLayer: IRenderingLayer) {
        Helper.renderShape(renderingLayer, this);
    }


    renderGizmos(renderingLayer: IRenderingLayer) {
        renderingLayer.setMatrixToTransform(this.transform);
        
        Gizmo.origin(renderingLayer, Vector.zero(), Gizmo.shapeColor);
        
        renderingLayer.resetMatrix();
    }
}