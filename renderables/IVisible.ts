import { Fill } from "../properties/Fill.js";
import { IBoxArea } from "./IArea.js";
import { IRenderingLayer } from "../RenderingLayer.js";
import { Shadow } from "../properties/Shadow.js";
import { Stroke } from "../properties/Stroke.js";


export interface IVisible {
    opacity: number;
    shadow: Shadow | null;

    getBoundingBox(renderingLayer: IRenderingLayer): IBoxArea,
}


export interface IShape extends IVisible {
    fill: Fill | null;
    stroke: Stroke | null;
}