import { LayerBlender } from "./LayerBlender.js";
export class TrackAlpha {
    constructor(width, height, inverted = false) {
        this._layerBlender = new LayerBlender(width, height, inverted ? "source-out" /* SourceOut */ : "source-in" /* SourceIn */);
    }
    get matteLayer() {
        return this._layerBlender.upperLayer;
    }
    get sourceLayer() {
        return this._layerBlender.lowerLayer;
    }
    render(renderingLayer) {
        // TODO: dodělat gizma
        this._layerBlender.render(renderingLayer);
    }
    clear() {
        this._layerBlender.clear();
    }
}
