import { Vector } from "../units/Vector.js";
import { Stroke } from "../properties/Stroke.js";
import { Fill } from "../properties/Fill.js";
import { Shadow } from "../properties/Shadow.js";
import { Helper } from "./Helper.js";
import { Gizmo } from "./Gizmo.js";
import { IRenderingLayer } from "../RenderingLayer.js";
import { IRenderable } from "./IRenderable.js";
import { IGeometry } from "./IGeometry.js";
import { Transform } from "../properties/Transform.js";
import { IShape, getBoundingBox } from "./IShape.js";


export class GeometryShape implements IRenderable, IShape {

    geometry: IGeometry;
    private _getBoundingBox: getBoundingBox;

    transform: Transform = new Transform();

    fill: Fill | null = null;
    stroke: Stroke | null = null;
    shadow: Shadow | null = null;

    opacity: number = 1;


    constructor(geometry: IGeometry, getBoundingBox: getBoundingBox) {
        this.geometry = geometry;
        this._getBoundingBox = getBoundingBox;
    }


    render(renderingLayer: IRenderingLayer) {
        Helper.render(renderingLayer, this.geometry, this, this);
    }


    renderGizmos(renderingLayer: IRenderingLayer) {
        renderingLayer.setMatrixToTransform(this.geometry.transform);

        Gizmo.origin(renderingLayer, Vector.zero(), Gizmo.shapeColor);

        renderingLayer.resetMatrix();
    }


    getBoundingBox(renderingLayer: IRenderingLayer) {
        return this._getBoundingBox(renderingLayer)
    }
}