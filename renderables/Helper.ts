import { Utils } from "../Utils/Utils.js";
import { Fill } from "../properties/Fill.js";
import { Stroke } from "../properties/Stroke.js";
import { Shadow } from "../properties/Shadow.js";
import { IRenderingLayer } from "../RenderingLayer";
import { IGeometry } from "./IGeometry.js";
import { IRenderable } from "./IRenderable.js";
import { IShape } from "./IShape.js";


export class Helper {


    static applyStyles(renderingLayer: IRenderingLayer, shape: IShape): void {
        const ctx = renderingLayer.getRenderingContext();

        ctx.globalAlpha = Utils.Numbers.limit(shape.opacity, 0, 1);

        if (shape.shadow) {
            shape.shadow.apply(renderingLayer, shape.getBoundingBox(renderingLayer));
        } else {
            Shadow.clear(renderingLayer);
        }

        if (shape.fill) {
            shape.fill.apply(renderingLayer, shape.getBoundingBox(renderingLayer));
            ctx.fill();
        } else {
            Fill.clear(renderingLayer);
        }

        if (shape.stroke) {
            shape.stroke.apply(renderingLayer, shape.getBoundingBox(renderingLayer));
            ctx.stroke();
        } else {
            Stroke.clear(renderingLayer);
        }

        ctx.globalAlpha = 1;
    }


    static render(renderingLayer: IRenderingLayer, geometry: IGeometry, renderable: IRenderable, shape: IShape): void {
        const ctx = renderingLayer.getRenderingContext();

        ctx.beginPath();
        geometry.contructMatrix(renderingLayer);
        geometry.drawWithoutMatrixManipulation(renderingLayer);

        Helper.applyStyles(renderingLayer, shape);

        geometry.destructMatrix(renderingLayer);
        ctx.closePath();

        if (renderingLayer.gizmoVisibility && renderable.renderGizmos) renderable.renderGizmos(renderingLayer);
    }


    // static render(renderingLayer: IRenderingLayer, geometry: IGeometry, renderable: IRenderable, shape: IShape): void {
    //     const ctx = renderingLayer.getRenderingContext();

    //     ctx.beginPath();
    //     geometry.contructMatrix(renderingLayer);
    //     geometry.drawWithoutMatrixManipulation(renderingLayer);

    //     ctx.globalAlpha = Utils.Numbers.limit(shape.opacity, 0, 1);

    //     if (shape.shadow) {
    //         shape.shadow.apply(renderingLayer, shape.getBoundingBox(renderingLayer));
    //     } else {
    //         Shadow.clear(renderingLayer);
    //     }

    //     if (shape.fill) {
    //         shape.fill.apply(renderingLayer, shape.getBoundingBox(renderingLayer));
    //         ctx.fill();
    //     } else {
    //         Fill.clear(renderingLayer);
    //     }

    //     if (shape.stroke) {
    //         shape.stroke.apply(renderingLayer, shape.getBoundingBox(renderingLayer));
    //         ctx.stroke();
    //     } else {
    //         Stroke.clear(renderingLayer);
    //     }

    //     geometry.destructMatrix(renderingLayer);
    //     ctx.closePath();

    //     ctx.globalAlpha = 1;

    //     if (renderingLayer.gizmoVisibility && renderable.renderGizmos) renderable.renderGizmos(renderingLayer);
    // }

}