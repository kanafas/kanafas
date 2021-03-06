import { IVisible } from "./IVisible.js";
import { Stroke } from "../properties/Stroke.js";
import { Fill } from "../properties/Fill.js";
import { IBoundingBox } from "./IBoundingBox.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";


export interface IShape extends IVisible {
    fill: Fill | null;
    stroke: Stroke | null;
    getBoundingBox: getBoundingBox,
}


export type getBoundingBox = {
    (renderingLayer: IRenderingLayer): IBoundingBox
};