import { Shape } from "./Shape.js";
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
        Shape.renderObject(renderingLayer, this, this, this);
    }
    renderGizmo(renderingLayer) {
        Shape.renderGizmo(renderingLayer, this);
    }
}
