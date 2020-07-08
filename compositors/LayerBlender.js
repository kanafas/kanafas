import { RenderingLayer } from "../core/RenderingLayer.js";
export class LayerBlender {
    constructor(width, height, compositeOperation) {
        const matteCanvas = document.createElement('canvas');
        const sourceCanvas = document.createElement('canvas');
        const resultCanvas = document.createElement('canvas');
        this.upperLayer = new RenderingLayer(matteCanvas, width, height);
        this.lowerLayer = new RenderingLayer(sourceCanvas, width, height);
        this._resultLayer = new RenderingLayer(resultCanvas, width, height);
        this.compositeOperation = compositeOperation;
    }
    render(renderingLayer) {
        const matteCanvas = this.upperLayer.getCanvas();
        const sourceCanvas = this.lowerLayer.getCanvas();
        const resultCanvas = this._resultLayer.getCanvas();
        this._resultLayer.clear();
        const resultCtx = this._resultLayer.getRenderingContext();
        resultCtx.globalCompositeOperation = "source-over" /* SourceOver */;
        resultCtx.drawImage(matteCanvas, 0, 0);
        resultCtx.globalCompositeOperation = this.compositeOperation;
        resultCtx.drawImage(sourceCanvas, 0, 0);
        const ctx = renderingLayer.getRenderingContext();
        ctx.drawImage(resultCanvas, 0, 0);
    }
    clear() {
        this.lowerLayer.clear();
        this.upperLayer.clear();
    }
}
// export const enum CompositeOperation {
//     SourceOver = 'source-over',
//     SourceAtop = 'source-atop',
//     SourceIn = 'source-in',
//     SourceOut = 'source-out',
//     DestinationOver = 'destination-over',
//     DestinationAtop = 'destination-atop',
//     DestinationIn = 'destination-in',
//     DestinationOut = 'destination-out',
//     Lighter = 'lighter',
//     Copy = 'copy',
//     XOR = 'xor',
// }
