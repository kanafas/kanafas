import { Utils } from "../utils/index.js";
import { Vector } from "../units/Vector.js";
import { IRenderingLayer } from "../RenderingLayer.js";
import { Shadow } from "../properties/Shadow.js";
import { Gizmo } from "./Gizmo.js";
import { Transform } from "../properties/Transform.js";
import { IObject, IRenderable, IVisible, valueModifier, IBoxArea } from "./types.js";


export class ImageObject implements IObject, IRenderable, IVisible {

    readonly source: HTMLImageElement;

    readonly width: number;
    readonly height: number;

    transform: Transform = new Transform();

    shadow: Shadow | null = null;
    opacity: number = 1;


    constructor(image: HTMLImageElement, width?: number | valueModifier<number>, height?: number | valueModifier<number>) {
        if (image.naturalWidth == 0 || image.naturalHeight == 0) {
            throw new Error("The image is not fully loaded.");
        }

        if (width != undefined && height != undefined) {
            this.width = typeof width == 'number' ? width : width(image.naturalWidth);
            this.height = typeof height == 'number' ? height : height(image.naturalHeight);
        } else {
            this.width = image.naturalWidth;
            this.height = image.naturalHeight;
        }

        this.source = image;
    }


    getBoundingBox(renderingLayer: IRenderingLayer): IBoxArea {
        return {
            origin: this.transform.origin.clone(),
            size: new Vector(this.width, this.height),
        }
    }


    render(renderingLayer: IRenderingLayer) {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;

        const t = this.transform;

        ctx.globalAlpha = Utils.Numbers.limit(this.opacity, 0, 1);

        renderingLayer.setMatrixToTransform(t);

        ctx.moveTo(-t.origin.x * pxs, -t.origin.y * pxs);
        ctx.drawImage(this.source, 0, 0, this.width * pxs, this.height * pxs);

        renderingLayer.resetMatrix();

        ctx.globalAlpha = 1;

        if (renderingLayer.gizmoVisibility && this.renderGizmos) this.renderGizmos(renderingLayer);
    }


    renderGizmos(renderingLayer: IRenderingLayer) {
        renderingLayer.setMatrixToTransform(this.transform);
        Gizmo.origin(renderingLayer, Vector.zero(), Gizmo.mediaColor);
        renderingLayer.resetMatrix();
    }
}