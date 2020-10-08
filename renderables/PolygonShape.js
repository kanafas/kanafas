import { PolygonGeometry } from "./PolygonGeometry.js";
import { Shape } from "./Shape.js";
export class PolygonShape extends PolygonGeometry {
    constructor(...points) {
        super(...points);
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
