import { Transform } from "./../properties/Transform.js";
import { Vector } from "./../units/Vector.js";
import { Utils } from "./../utils/Utils.js";
import { Gizmo } from "./../debugger/Gizmo.js";
/** @deprecated */
export class ImageSliceObject {
    constructor(source, sliceX, sliceY, sliceWidth, sliceHeight) {
        this.transform = new Transform();
        this.shadow = null;
        this.opacity = 1;
        if (source.naturalWidth == 0 || source.naturalHeight == 0) {
            throw new Error("The image is not fully loaded.");
        }
        this.width = sliceWidth;
        this.height = sliceHeight;
        this.sliceX = sliceX;
        this.sliceY = sliceY;
        this.sliceWidth = sliceWidth;
        this.sliceHeight = sliceHeight;
        this.source = source;
    }
    getBoundingBox(renderingLayer) {
        return {
            origin: this.transform.origin.clone(),
            size: new Vector(this.width, this.height),
        };
    }
    render(renderingLayer) {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;
        const t = this.transform;
        ctx.globalAlpha = Utils.Numbers.limit(this.opacity, 0, 1);
        renderingLayer.setMatrixToTransform(t);
        ctx.moveTo(-t.origin.x * pxs, -t.origin.y * pxs);
        ctx.drawImage(this.source, this.sliceX, this.sliceY, this.sliceWidth, this.sliceHeight, 0, 0, this.width * pxs, this.height * pxs);
        renderingLayer.resetMatrix();
        ctx.globalAlpha = 1;
        if (renderingLayer.gizmoVisibility && this.renderGizmo)
            this.renderGizmo(renderingLayer);
    }
    renderGizmo(renderingLayer) {
        renderingLayer.setMatrixToTransform(this.transform);
        Gizmo.origin(renderingLayer, Vector.Zero, Gizmo.mediaColor);
        renderingLayer.resetMatrix();
    }
    getImageElement() {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(this.source, this.sliceX, this.sliceY, this.sliceWidth, this.sliceHeight, 0, 0, this.width, this.height);
        const dataURL = canvas.toDataURL('image/png');
        const imageElement = document.createElement('img');
        imageElement.src = dataURL;
        return imageElement;
    }
}
