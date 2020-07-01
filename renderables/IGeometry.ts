import { IRenderingLayer } from "../RenderingLayer";


export interface IGeometry {
    contructMatrix(renderingLayer: IRenderingLayer): void,
    destructMatrix(renderingLayer: IRenderingLayer): void,
    drawWithoutMatrixManipulation(renderingLayer: IRenderingLayer): void,

    draw(renderingLayer: IRenderingLayer): void,
}