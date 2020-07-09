import { Transform } from "./../properties/Transform.js";
import { Shape } from "./Shape.js";
export class GeometryShape {
    constructor(geometry, getBoundingBox) {
        this.transform = new Transform();
        this.fill = null;
        this.stroke = null;
        this.shadow = null;
        this.opacity = 1;
        this.geometry = geometry;
        this._getBoundingBox = getBoundingBox;
    }
    render(renderingLayer) {
        Shape.renderObject(renderingLayer, this.geometry, this, this);
    }
    renderGizmo(renderingLayer) {
        Shape.renderGizmo(renderingLayer, this.geometry);
    }
    getBoundingBox(renderingLayer) {
        return this._getBoundingBox(renderingLayer);
    }
}
