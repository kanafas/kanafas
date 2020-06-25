import { Vector, IVector } from "../node_modules/kanafas-units/Vector.js";
import { IRenderingLayer } from "../RenderingLayer.js";
import { IObject, IRenderable, IShape } from "./types.js";
import { Fill } from "../properties/Fill.js";
import { Shadow } from "../properties/Shadow.js";
import { Stroke } from "../properties/Stroke.js";
import { PolygonGeometry } from "./PolygonGeometry.js";
import { Helper } from "./Helper.js";
import { Gizmo } from "./Gizmo.js";


export class PolygonShape extends PolygonGeometry implements IObject, IRenderable, IShape {

    fill: Fill|null = null;
    stroke: Stroke|null = null;
    shadow: Shadow|null = null;
    
    opacity: number = 1;

    constructor(points: IVector[], closed?: boolean, trimStart?: number, trimEnd?: number, trimOffset?: number) {
        super(points, closed, trimStart, trimEnd, trimOffset);
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