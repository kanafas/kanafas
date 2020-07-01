import { IRenderingLayer } from "../RenderingLayer.js";


export interface IRenderable {
    render(renderingLayer: IRenderingLayer): void,
    renderGizmos?(renderingLayer: IRenderingLayer): void,
}