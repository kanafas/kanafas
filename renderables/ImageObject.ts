import { IObject } from "./IObject.js";
import { IRenderable } from "./IRenderable.js";
import { IVisible } from "./IVisible.js";
import { Transform } from "./../properties/Transform.js";
import { Shadow } from "./../properties/Shadow.js";
import { valueModifier } from "./../types/valueModifier.js";
import { IBoundingBox } from "./IBoundingBox.js";
import { IRenderingLayer } from "./../core/RenderingLayer.js";
import { Vector } from "./../units/Vector.js";
import { Utils } from "./../utils/Utils.js";
import { Gizmo } from "./../debugger/Gizmo.js";
import { IClonable } from "../core/IClonable.js";


export class ImageObject implements IObject, IRenderable, IVisible, IClonable<ImageObject> {

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


    getBoundingBox(renderingLayer: IRenderingLayer): IBoundingBox {
        return {
            origin: this.transform.origin.clone(),
            size: new Vector(this.width, this.height),
        }
    }


    render(renderingLayer: IRenderingLayer) {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;

        const t = this.transform;

        renderingLayer.setMatrixToTransform(t);

        ctx.globalAlpha = Utils.Numbers.limit(this.opacity, 0, 1);

        if (this.shadow) {
            this.shadow.apply(renderingLayer, this.getBoundingBox(renderingLayer));
        } else {
            Shadow.clear(renderingLayer);
        }

        ctx.moveTo(-t.origin.x * pxs, -t.origin.y * pxs);
        ctx.drawImage(this.source, 0, 0, this.width * pxs, this.height * pxs);

        renderingLayer.resetMatrix();

        ctx.globalAlpha = 1;

        if (renderingLayer.gizmoVisibility && this.renderGizmo) this.renderGizmo(renderingLayer);
    }


    renderGizmo(renderingLayer: IRenderingLayer) {
        renderingLayer.setMatrixToTransform(this.transform);
        Gizmo.origin(renderingLayer, Vector.Zero, Gizmo.mediaColor);
        renderingLayer.resetMatrix();
    }


    clone(): ImageObject {
        const image = new ImageObject(this.source, this.width, this.height);
        image.transform = this.transform.clone();
        image.shadow = this.shadow?.clone() ?? null;
        image.opacity = this.opacity;

        return image;
    }
}