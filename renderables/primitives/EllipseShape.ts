import { RectangleGeometry } from "./RectangleGeometry.js";
import { IRenderable } from "../IRenderable.js";
import { IShape } from "../IShape.js";
import { Fill } from "../../properties/Fill.js";
import { Stroke } from "../../properties/Stroke.js";
import { Shadow } from "../../properties/Shadow.js";
import { IRenderingLayer } from "../../core/RenderingLayer.js";
import { Helper } from "../Helper.js";
import { Vector } from "../../units/units.js";
import { Gizmo } from "../../debugger/Gizmo.js";
import { EllipseGeometry } from "./EllipseGeometry.js";


export class EllipseShape extends EllipseGeometry implements IRenderable, IShape {

    fill: Fill | null = null;
    stroke: Stroke | null = null;
    shadow: Shadow | null = null;

    opacity: number = 1;

    constructor(width: number, height: number) {
        super(width, height);
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