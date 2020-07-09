import { IBoundingBox } from "./IBoundingBox.js";
import { IObject } from "./IObject.js";
import { Transform } from "../properties/Transform.js";
import { Vector } from "../units/Vector.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";
import { Gizmo } from "../debugger/Gizmo.js";


export class NullObject implements IObject {

    transform: Transform = new Transform();


    constructor() {
    }


    getBoundingBox(renderingLayer: IRenderingLayer): IBoundingBox {
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