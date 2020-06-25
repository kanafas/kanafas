import { RenderingLayer, IRenderingLayer } from "./RenderingLayer.js";
import { IRenderable } from "./renderables/types.js";


export class LayerBlender implements IRenderable {

    readonly upperLayer: RenderingLayer;
    readonly lowerLayer: RenderingLayer;
    private _resultLayer: RenderingLayer;

    readonly compositeOperation: CompositeOperation;

    
    constructor(width: number, height: number, compositeOperation: CompositeOperation) {
        const matteCanvas = document.createElement('canvas');
        const sourceCanvas = document.createElement('canvas');
        const resultCanvas = document.createElement('canvas');

        this.upperLayer = new RenderingLayer(matteCanvas, width, height);
        this.lowerLayer = new RenderingLayer(sourceCanvas, width, height);
        this._resultLayer = new RenderingLayer(resultCanvas, width, height);

        this.compositeOperation = compositeOperation;
    }


    render(renderingLayer: IRenderingLayer) {
        const matteCanvas = this.upperLayer.getCanvas();
        const sourceCanvas = this.lowerLayer.getCanvas();
        const resultCanvas = this._resultLayer.getCanvas();

        this._resultLayer.clear();
        
        const resultCtx = this._resultLayer.getRenderingContext();
        resultCtx.globalCompositeOperation = CompositeOperation.SourceOver;
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


export const enum CompositeOperation {
    Color = 'color',
    ColorBurn = 'color-burn',
    ColorDodge = 'color-dodge',
    Copy = 'copy',
    Darken = 'darken',
    DestinationAtop = 'destination-atop',
    DestinationIn = 'destination-in',
    DestinationOut = 'destination-out',
    DestinationOver = 'destination-over',
    Difference = 'difference',
    Exclusion = 'exclusion',
    HardLight = 'hard-light',
    Hue = 'hue',
    Lighten = 'lighten',
    Lighter = 'lighter',
    Luminosity = 'luminosity',
    Multiply = 'multiply',
    Overlay = 'overlay',
    Saturation = 'saturation',
    Screen = 'screen',
    SoftLight = 'soft-light',
    SourceAtop = 'source-atop',
    SourceIn = 'source-in',
    SourceOut = 'source-out',
    SourceOver = 'source-over',
    XOR = 'xor',
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