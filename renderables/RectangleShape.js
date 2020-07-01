import { Gizmo } from "./Gizmo.js";
import { Helper } from "./Helper.js";
import { RectangleGeometry } from "./RectangleGeometry.js";
import { Vector } from "../units/Vector.js";
export class RectangleShape extends RectangleGeometry {
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
