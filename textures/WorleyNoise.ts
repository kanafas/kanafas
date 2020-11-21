import { IRenderingLayer } from "../core/RenderingLayer.js";
import { IRenderable } from "../renderables/IRenderable.js";
import { IColorRGBA } from "../styles/Color.js";
import { Vector } from "../units/index.js";
import { Numbers } from "../utils/Numbers.js";

export class WorleyNoise implements IRenderable {

    width: number;
    height: number;
    points: Vector[] = [];

    noiseLimitMin: number = 0;
    noiseLimitMax: number = 255;

    contrast: number;

    private _imageData: ImageData | null = null;
    private _pixelModifierCallback: IPixelModifierCallback = (red: number, green: number, blue: number, alpha: number, x: number, y: number, pixelIndex: number) => {
        return {
            red, green, blue, alpha: 1
        }
    }


    constructor(width: number, height: number, pointCount: number, contrast: number = 1) {
        this.width = width;
        this.height = height;

        this.contrast = contrast;

        for (let i = 0; i < pointCount; i++) {
            const p = new Vector(Math.random() * this.width, Math.random() * this.height);
            this.points.push(p);
        }
    }


    setPixelModifierCallback(callback: IPixelModifierCallback): void {
        this._pixelModifierCallback = callback;
    }


    private async _computeImageData(renderingLayer: IRenderingLayer): Promise<void> {
        const ctx = renderingLayer.getRenderingContext();
        const imageData = ctx.createImageData(this.width, this.height);
        const buffer = new Uint8Array(imageData.data.buffer);

        const nClosest = 0;

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const pixelIndex = x + y * this.width;
                const channelIndex = pixelIndex * 4;

                const distances: number[] = Array(this.points.length);

                for (let i = 0; i < this.points.length; i++) {
                    const point = this.points[i];

                    const d = Vector.distance({ x, y }, point);
                    distances[i] = d;
                }

                const sortedDistances = distances.sort((a, b) => a - b);

                const nClosestDistance = sortedDistances[Math.min(nClosest, sortedDistances.length - 1)] * this.contrast;
                const noise = Numbers.remap(
                    Numbers.limit(nClosestDistance, this.noiseLimitMin, this.noiseLimitMax),
                    this.noiseLimitMin, this.noiseLimitMax, 0, 255);

                const color = this._pixelModifierCallback(noise, noise, noise, noise, x, y, pixelIndex);

                buffer[channelIndex + 0] = color.red;
                buffer[channelIndex + 1] = color.green;
                buffer[channelIndex + 2] = color.blue;
                buffer[channelIndex + 3] = color.alpha * 255;
            }
        }

        this._imageData = imageData;
    }


    render(renderingLayer: IRenderingLayer) {
        const ctx = renderingLayer.getRenderingContext();

        if (this._imageData) {
            ctx.putImageData(this._imageData, 0, 0);
        } else {
            setTimeout(async () => {
                this._computeImageData(renderingLayer);
                this.render(renderingLayer);
            }, 0);
        }
    }
}


export interface IPixelModifierCallback {
    (red: number, green: number, blue: number, alpha: number, x: number, y: number, pixelIndex: number): IColorRGBA;
}