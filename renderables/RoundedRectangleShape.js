import { Shape } from "./Shape.js";
import { RoundedRectangleGeometry } from "./RoundedRectangleGeometry.js";
export class RoundedRectangleShape extends RoundedRectangleGeometry {
    constructor(width, height, ...radius) {
        super(width, height, ...radius);
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
