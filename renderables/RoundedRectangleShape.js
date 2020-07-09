import { Shape } from "./Shape.js";
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
        Shape.renderObject(renderingLayer, this, this, this);
    }
    renderGizmo(renderingLayer) {
        Shape.renderGizmo(renderingLayer, this);
    }
}
