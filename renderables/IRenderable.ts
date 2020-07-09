import { IRenderingLayer } from "../core/RenderingLayer.js";


export interface IRenderable {
    render(renderingLayer: IRenderingLayer): void,
    renderGizmo?(renderingLayer: IRenderingLayer): void,
}