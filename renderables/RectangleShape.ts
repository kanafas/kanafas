import { Fill } from "../properties/Fill.js";
import { Gizmo } from "./Gizmo.js";
import { Helper } from "./Helper.js";
import { IObject } from "./IObject.js";
import { IRenderable } from "./IRenderable.js";
import { IRenderingLayer } from "../RenderingLayer.js";
import { RectangleGeometry } from "./RectangleGeometry.js";
import { Shadow } from "../properties/Shadow.js";
import { Stroke } from "../properties/Stroke.js";
import { Vector } from "../units/Vector.js";
import { IShape } from "./IShape.js";


export class RectangleShape extends RectangleGeometry implements IObject, IRenderable, IShape {

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