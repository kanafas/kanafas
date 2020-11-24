import { IRenderingLayer } from "../core/index.js";
import { IObject, IRenderable, IVisible } from "../renderables/index.js";


export interface ITexture extends IObject, IRenderable, IVisible {
    generate(renderingLayer: IRenderingLayer): Promise<void>,
}