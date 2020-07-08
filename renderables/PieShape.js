import { Vector } from "../units/Vector.js";
import { PieGeometry } from "./PieGeometry.js";
import { Helper } from "./Helper.js";
import { Gizmo } from "./Gizmo.js";
export class PieShape extends PieGeometry {
    constructor(width, height, startAngle, endAngle, innerRadius) {
        super(width, height, startAngle, endAngle, innerRadius);
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
