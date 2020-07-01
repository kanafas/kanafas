import { Vector } from "../units/Vector.js";
import { Stroke } from "../properties/Stroke.js";
import { Fill } from "../properties/Fill.js";
import { Shadow } from "../properties/Shadow.js";
import { EllipseGeometry } from "./EllipseGeometry.js";
import { Helper } from "./Helper.js";
import { Gizmo } from "./Gizmo.js";
import { IRenderingLayer } from "../RenderingLayer.js";
import { IObject, IRenderable, IShape } from "./types.js";


export class EllipseShape extends EllipseGeometry implements IObject, IRenderable, IShape {

    fill: Fill | null = null;
    stroke: Stroke | null = null;
    shadow: Shadow | null = null;

    opacity: number = 1;

    constructor(width: number, height: number) {
        super(width, height);
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