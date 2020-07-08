import { Helper } from "../Helper.js";
import { Vector } from "../../units/units.js";
import { Gizmo } from "../../debugger/Gizmo.js";
import { PieGeometry } from "./PieGeometry.js";
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
