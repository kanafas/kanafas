import { Helper } from "./Helper.js";
import { Vector } from "./../units/Vector.js";
import { Gizmo } from "./../debugger/Gizmo.js";
import { PolygonGeometry } from "./PolygonGeometry.js";
export class PolygonShape extends PolygonGeometry {
    constructor(points, closed, trimStart, trimEnd, trimOffset) {
        super(points, closed, trimStart, trimEnd, trimOffset);
        this.fill = null;
        this.stroke = null;
        this.shadow = null;
        this.opacity = 1;
    }
    render(renderingLayer) {
        Helper.render(renderingLayer, this, this, this);
    }
    renderGizmos(renderingLayer) {
        renderingLayer.setMatrixToTransform(this.transform);
        Gizmo.origin(renderingLayer, Vector.zero(), Gizmo.shapeColor);
        renderingLayer.resetMatrix();
    }
}
