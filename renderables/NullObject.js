import { Transform } from "../properties/Transform.js";
import { Vector } from "../units/Vector.js";
import { Gizmo } from "../debugger/Gizmo.js";
export class NullObject {
    constructor() {
        this.transform = new Transform();
    }
    getBoundingBox(renderingLayer) {
        return {
            origin: this.transform.origin.clone(),
            size: Vector.Zero,
        };
    }
    render(renderingLayer) {
        if (renderingLayer.gizmoVisibility && this.renderGizmos)
            this.renderGizmos(renderingLayer);
    }
    renderGizmos(renderingLayer) {
        renderingLayer.setMatrixToTransform(this.transform);
        Gizmo.origin(renderingLayer, Vector.Zero, Gizmo.nullColor);
        renderingLayer.resetMatrix();
    }
    clone() {
        const n = new NullObject();
        n.transform = this.transform.clone();
        return n;
    }
}
