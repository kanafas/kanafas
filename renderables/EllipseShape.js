import { Vector } from "../node_modules/kanafas-units/Vector.js";
import { EllipseGeometry } from "./EllipseGeometry.js";
import { Helper } from "./Helper.js";
import { Gizmo } from "./Gizmo.js";
export class EllipseShape extends EllipseGeometry {
    constructor(width, height) {
        super(width, height);
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
