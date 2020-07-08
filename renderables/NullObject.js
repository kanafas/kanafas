import { Transform } from "../properties/Transform.js";
import { Vector } from "../units/Vector.js";
import { Gizmo } from "../debuger/Gizmo.js";
export class NullObject {
    constructor() {
        this.transform = new Transform();
    }
    getBoundingBox(renderingLayer) {
        return {
            origin: this.transform.origin.clone(),
            size: Vector.zero(),
        };
    }
    render(renderingLayer) {
        if (renderingLayer.gizmoVisibility && this.renderGizmos)
            this.renderGizmos(renderingLayer);
    }
    renderGizmos(renderingLayer) {
        renderingLayer.setMatrixToTransform(this.transform);
        Gizmo.origin(renderingLayer, Vector.zero(), Gizmo.nullColor);
        renderingLayer.resetMatrix();
    }
}
