import { Vector } from "../units/Vector.js";
import { Helper } from "./Helper.js";
import { Gizmo } from "./Gizmo.js";
import { Transform } from "../properties/Transform.js";
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
        Helper.render(renderingLayer, this.geometry, this, this);
    }
    renderGizmos(renderingLayer) {
        renderingLayer.setMatrixToTransform(this.geometry.transform);
        Gizmo.origin(renderingLayer, Vector.zero(), Gizmo.shapeColor);
        renderingLayer.resetMatrix();
    }
    getBoundingBox(renderingLayer) {
        return this._getBoundingBox(renderingLayer);
    }
}
