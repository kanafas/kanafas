import { Vector } from "../node_modules/kanafas-units/Vector.js";
import { PolygonGeometry } from "./PolygonGeometry.js";
import { Helper } from "./Helper.js";
import { Gizmo } from "./Gizmo.js";
export class PolygonShape extends PolygonGeometry {
    constructor(points, closed, trimStart, trimEnd, trimOffset) {
        super(points, closed, trimStart, trimEnd, trimOffset);
        this.fill = null;
        this.stroke = null;
        this.shadow = null;
        this.opacity = 1;
    }
    render(renderingLayer) {
        Helper.renderShape(renderingLayer, this);
    }
    renderGizmos(renderingLayer) {
        renderingLayer.setMatrixToTransform(this.transform);
        Gizmo.origin(renderingLayer, Vector.zero(), Gizmo.shapeColor);
        renderingLayer.resetMatrix();
    }
}
