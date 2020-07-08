import { IRenderable } from "../IRenderable.js";
import { IShape, getBoundingBox } from "../IShape.js";
import { IGeometry } from "../IGeometry.js";
import { Transform } from "../../properties/Transform.js";
import { Fill } from "../../properties/Fill.js";
import { Stroke } from "../../properties/Stroke.js";
import { Shadow } from "../../properties/Shadow.js";
import { IRenderingLayer } from "../../core/RenderingLayer.js";
import { Vector } from "../../units/units.js";
import { Gizmo } from "../../debuger/Gizmo.js";
import { Helper } from "../Helper.js";



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