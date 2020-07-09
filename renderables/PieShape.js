import { Shape } from "./Shape.js";
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
        Shape.renderObject(renderingLayer, this, this, this);
    }
    renderGizmo(renderingLayer) {
        Shape.renderGizmo(renderingLayer, this);
    }
}
