import { Vector } from "../node_modules/kanafas-units/Vector.js";
import { IRenderingLayer } from "../RenderingLayer.js";
import { Transform } from "../properties/Transform.js";
import { Fill } from "../properties/Fill.js";
import { Stroke } from "../properties/Stroke.js";
import { Shadow } from "../properties/Shadow.js";


export type valueModifier<T> = {
    (input: T): T;
}


export interface IArea {}


export interface IBoxArea extends IArea {
    origin: Vector,
    size: Vector,
}


export interface IObject {
    transform: Transform,
}


export interface IRenderable {
    render(renderingLayer: IRenderingLayer): void,
    renderGizmos?(renderingLayer: IRenderingLayer): void,
}


export interface IGeometry {
    contructMatrix(renderingLayer: IRenderingLayer): void,
    destructMatrix(renderingLayer: IRenderingLayer): void,
    drawWithoutMatrixManipulation(renderingLayer: IRenderingLayer): void,
    
    draw(renderingLayer: IRenderingLayer): void,
}


export interface IVisible {
    opacity: number;
    shadow: Shadow|null;
    
    getBoundingBox(renderingLayer: IRenderingLayer): IBoxArea,
}


export interface IShape extends IVisible {
    fill: Fill|null;
    stroke: Stroke|null;
}