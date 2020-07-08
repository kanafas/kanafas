import { Helper } from "./Helper.js";
import { Vector } from "./../units/Vector.js";
import { Gizmo } from "./../debugger/Gizmo.js";
import { RoundedRectangleGeometry } from "./RoundedRectangleGeometry.js";
export class RoundedRectangleShape extends RoundedRectangleGeometry {
    constructor(width, height, radius1, radius2, radius3, radius4) {
        super(width, height, radius1, radius2, radius3, radius4);
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
