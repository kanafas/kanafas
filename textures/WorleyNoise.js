import { Vector } from "../units/index.js";
import { Numbers } from "../utils/Numbers.js";
export class WorleyNoise {
    constructor(width, height, pointCount, contrast = 1) {
        this.points = [];
        this.noiseLimitMin = 0;
        this.noiseLimitMax = 255;
        this._imageData = null;
        this._pixelModifierCallback = (red, green, blue, alpha, x, y, pixelIndex) => {
            return {
                red, green, blue, alpha: 1
            };
        };
        this.width = width;
        this.height = height;
        this.contrast = contrast;
        for (let i = 0; i < pointCount; i++) {
            const p = new Vector(Math.random() * this.width, Math.random() * this.height);
            this.points.push(p);
        }
    }
    setPixelModifierCallback(callback) {
        this._pixelModifierCallback = callback;
    }
    async _computeImageData(renderingLayer) {
        const ctx = renderingLayer.getRenderingContext();
        const imageData = ctx.createImageData(this.width, this.height);
        const buffer = new Uint8Array(imageData.data.buffer);
        const nClosest = 0;
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const pixelIndex = x + y * this.width;
                const channelIndex = pixelIndex * 4;
                const distances = Array(this.points.length);
                for (let i = 0; i < this.points.length; i++) {
                    const point = this.points[i];
                    const d = Vector.distance({ x, y }, point);
                    distances[i] = d;
                }
                const sortedDistances = distances.sort((a, b) => a - b);
                const nClosestDistance = sortedDistances[Math.min(nClosest, sortedDistances.length - 1)] * this.contrast;
                const noise = Numbers.remap(Numbers.limit(nClosestDistance, this.noiseLimitMin, this.noiseLimitMax), this.noiseLimitMin, this.noiseLimitMax, 0, 255);
                const color = this._pixelModifierCallback(noise, noise, noise, noise, x, y, pixelIndex);
                buffer[channelIndex + 0] = color.red;
                buffer[channelIndex + 1] = color.green;
                buffer[channelIndex + 2] = color.blue;
                buffer[channelIndex + 3] = color.alpha * 255;
            }
        }
        this._imageData = imageData;
    }
    render(renderingLayer) {
        const ctx = renderingLayer.getRenderingContext();
        if (this._imageData) {
            ctx.putImageData(this._imageData, 0, 0);
        }
        else {
            setTimeout(async () => {
                this._computeImageData(renderingLayer);
                this.render(renderingLayer);
            }, 0);
        }
    }
}
