import { RectangleGeometry } from "./RectangleGeometry.js";
import { Shape } from "./Shape.js";
export class RectangleShape extends RectangleGeometry {
    constructor(width, height) {
        super(width, height);
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
    clone() {
        const rectangle = new RectangleShape(this.width, this.height);
        rectangle.fill = this.fill?.clone() ?? null;
        rectangle.stroke = this.stroke?.clone() ?? null;
        rectangle.shadow = this.shadow?.clone() ?? null;
        rectangle.opacity = this.opacity;
        return rectangle;
    }
}
