import { IBoundingBox } from "./IBoundingBox.js";
import { IObject } from "./IObject.js";
import { Transform } from "../properties/Transform.js";
import { Vector } from "../units/Vector.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";
import { Gizmo } from "../debugger/Gizmo.js";
import { IClonable } from "../core/IClonable.js";


export class NullObject implements IObject, IClonable<NullObject> {

    transform: Transform = new Transform();


    constructor() { }


    getBoundingBox(renderingLayer: IRenderingLayer): IBoundingBox {
        return {
            origin: this.transform.origin.clone(),
            size: Vector.zero,
        }
    }


    render(renderingLayer: IRenderingLayer) {
        if (renderingLayer.gizmoVisibility && this.renderGizmos) this.renderGizmos(renderingLayer);
    }


    renderGizmos(renderingLayer: IRenderingLayer) {
        renderingLayer.setMatrixToTransform(this.transform);
        Gizmo.origin(renderingLayer, Vector.zero, Gizmo.nullColor);
        renderingLayer.resetMatrix();
    }


    clone(): NullObject {
        const n = new NullObject();
        n.transform = this.transform.clone();

        return n;
    }
}