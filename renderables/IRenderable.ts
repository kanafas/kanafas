import { IRenderingLayer } from "../core/RenderingLayer.js";


export interface IRenderable {
    render(renderingLayer: IRenderingLayer): void,
    renderGizmos?(renderingLayer: IRenderingLayer): void,
}