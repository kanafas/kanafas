import { IRenderable } from "./IRenderable.js";
import { IShape, getBoundingBox } from "./IShape.js";
import { IGeometry } from "./IGeometry.js";
import { Transform } from "./../properties/Transform.js";
import { Fill } from "./../properties/Fill.js";
import { Stroke } from "./../properties/Stroke.js";
import { Shadow } from "./../properties/Shadow.js";
import { IRenderingLayer } from "./../core/RenderingLayer.js";
import { Shape } from "./Shape.js";


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
        Shape.renderObject(renderingLayer, this.geometry, this, this);
    }


    renderGizmo(renderingLayer: IRenderingLayer) {
        Shape.renderGizmo(renderingLayer, this.geometry);
    }


    getBoundingBox(renderingLayer: IRenderingLayer) {
        return this._getBoundingBox(renderingLayer)
    }

}