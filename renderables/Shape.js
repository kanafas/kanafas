import { Utils } from "../utils/Utils.js";
import { Fill } from "../properties/Fill.js";
import { Stroke } from "../properties/Stroke.js";
import { Shadow } from "../properties/Shadow.js";
import { Gizmo } from "../debugger/Gizmo.js";
import { Vector } from "../units/index.js";
export class Shape {
    static applyStyles(renderingLayer, shape) {
        const ctx = renderingLayer.getRenderingContext();
        ctx.globalAlpha = Utils.Numbers.limit(shape.opacity, 0, 1);
        if (shape.shadow) {
            shape.shadow.apply(renderingLayer, shape.getBoundingBox(renderingLayer));
        }
        else {
            Shadow.clear(renderingLayer);
        }
        if (shape.fill) {
            shape.fill.apply(renderingLayer, shape.getBoundingBox(renderingLayer));
            ctx.fill();
        }
        else {
            Fill.clear(renderingLayer);
        }
        if (shape.stroke) {
            shape.stroke.apply(renderingLayer, shape.getBoundingBox(renderingLayer));
            ctx.stroke();
        }
        else {
            Stroke.clear(renderingLayer);
        }
        ctx.globalAlpha = 1;
    }
    static renderObject(renderingLayer, geometry, renderable, shape) {
        const ctx = renderingLayer.getRenderingContext();
        ctx.beginPath();
        geometry.contructMatrix(renderingLayer);
        geometry.drawWithoutMatrixManipulation(renderingLayer);
        Shape.applyStyles(renderingLayer, shape);
        geometry.destructMatrix(renderingLayer);
        ctx.closePath();
        if (renderingLayer.gizmoVisibility && renderable.renderGizmo)
            renderable.renderGizmo(renderingLayer);
    }
    static renderGizmo(renderingLayer, geometry) {
        renderingLayer.setMatrixToTransform(geometry.transform);
        Gizmo.origin(renderingLayer, Vector.zero(), Gizmo.shapeColor);
        renderingLayer.resetMatrix();
    }
}
