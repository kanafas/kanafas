import { IVisible } from "./IVisible.js";
import { Stroke } from "../properties/Stroke.js";
import { Fill } from "../properties/Fill.js";
import { IRenderingLayer } from "../RenderingLayer.js";
import { IBoxArea } from "./IArea.js";


export interface IShape extends IVisible {
    fill: Fill | null;
    stroke: Stroke | null;
    getBoundingBox: getBoundingBox,
}


export type getBoundingBox = {
    (renderingLayer: IRenderingLayer): IBoxArea
};