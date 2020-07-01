import { Utils } from "../utils/index.js";
import { Engine } from "../Engine";
import { Fill } from "../properties/Fill.js";
import { Stroke } from "../properties/Stroke.js";
import { Shadow } from "../properties/Shadow.js";
import { IRenderingLayer } from "../RenderingLayer";
import { IObject, IGeometry, IShape, IRenderable } from "./types";



// TODO: To by se mělo přejmenovt, nebo přesunout, nebo obojí
export class Helper {

    static renderShape(renderingLayer: IRenderingLayer, object: IObject&IGeometry&IRenderable&IShape) {
        const ctx = renderingLayer.getRenderingContext();

        ctx.beginPath();
        object.contructMatrix(renderingLayer);
        object.drawWithoutMatrixManipulation(renderingLayer);

        ctx.globalAlpha = Utils.Numbers.limit(object.opacity, 0, 1);

        if (object.shadow) {
            object.shadow.apply(renderingLayer, object.getBoundingBox(renderingLayer));
        } else {
            Shadow.clear(renderingLayer);
        }

        if (object.fill) {
            object.fill.apply(renderingLayer, object.getBoundingBox(renderingLayer));
            ctx.fill();
        } else {
            Fill.clear(renderingLayer);
        }

        if (object.stroke) {
            object.stroke.apply(renderingLayer, object.getBoundingBox(renderingLayer));
            ctx.stroke();
        } else {
            Stroke.clear(renderingLayer);
        }

        object.destructMatrix(renderingLayer);
        ctx.closePath();

        ctx.globalAlpha = 1;

        if (renderingLayer.gizmoVisibility && object.renderGizmos) object.renderGizmos(renderingLayer);
    }

}