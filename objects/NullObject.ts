import { Vector } from "../units/Vector.js";
import { IObject, IBoxArea } from "./types.js";
import { Transform } from "../properties/Transform.js";
import { Gizmo } from "./Gizmo.js";
import { IRenderingLayer } from "../RenderingLayer.js";


export class NullObject implements IObject {

    transform: Transform = new Transform();

    constructor() {
    }


    getBoundingBox(renderingLayer: IRenderingLayer): IBoxArea {
        return {
            origin: this.transform.origin.clone(),
            size: Vector.zero(),
        }
    }


    render(renderingLayer: IRenderingLayer) {
        if (renderingLayer.gizmoVisibility && this.renderGizmos) this.renderGizmos(renderingLayer);
    }


    renderGizmos(renderingLayer: IRenderingLayer) {
        renderingLayer.setMatrixToTransform(this.transform);
        Gizmo.origin(renderingLayer, Vector.zero(), Gizmo.nullColor);
        renderingLayer.resetMatrix();
    }
}