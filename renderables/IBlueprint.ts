import { IRenderingLayer } from "../RenderingLayer";


export interface IBlueprint {
    contructMatrix(renderingLayer: IRenderingLayer): void,
    destructMatrix(renderingLayer: IRenderingLayer): void,
    drawWithoutMatrixManipulation(renderingLayer: IRenderingLayer): void,

    draw(renderingLayer: IRenderingLayer): void,
}