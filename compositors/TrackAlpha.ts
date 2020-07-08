import { LayerBlender, CompositeOperation } from "./LayerBlender.js";
import { IRenderable } from "../renderables/IRenderable.js";
import { RenderingLayer, IRenderingLayer } from "../core/RenderingLayer.js";


export class TrackAlpha implements IRenderable {

    private _layerBlender: LayerBlender;

    get matteLayer(): RenderingLayer {
        return this._layerBlender.upperLayer;
    }
    get sourceLayer(): RenderingLayer {
        return this._layerBlender.lowerLayer;
    }

    constructor(width: number, height: number, inverted: boolean = false) {
        this._layerBlender = new LayerBlender(width, height, inverted ? CompositeOperation.SourceOut : CompositeOperation.SourceIn);
    }


    render(renderingLayer: IRenderingLayer) {
        // TODO: dodělat gizma
        this._layerBlender.render(renderingLayer);
    }


    clear() {
        this._layerBlender.clear();
    }

}