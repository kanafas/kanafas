import { IRenderingLayer } from "../core/RenderingLayer.js";
import { Gizmo } from "../debugger/Gizmo.js";
import { Transform } from "../properties/index.js";
import { IObject, IVisible } from "../renderables/index.js";
import { IRenderable } from "../renderables/IRenderable.js";
import { IColorRGBA } from "../styles/Color.js";
import { Vector } from "../units/index.js";
import { Numbers } from "../utils/Numbers.js";

export class WorleyNoise implements IObject, IRenderable {

    transform: Transform = new Transform();

    width: number;
    height: number;
    points: Vector[] = [];

    noiseLimitMin: number = 0;
    noiseLimitMax: number = 255;

    contrast: number;

    private _imageData: ImageData | null = null;
    private _pixelModifierCallback: IPixelModifierCallback = (red: number, green: number, blue: number, alpha: number, x: number, y: number, pixelIndex: number) => {
        return { red, green, blue, alpha: 1 }
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


    async generate(renderingLayer: IRenderingLayer): Promise<void> {
        const promise = new Promise<void>((resolve, reject) => {
            // const canvas = document.createElement

            const ctx = renderingLayer.getRenderingContext();
            const pxs = renderingLayer.pixelScale;

            const imageData = ctx.createImageData(this.width * pxs, this.height * pxs);
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
            resolve();
        });
    }


    render(renderingLayer: IRenderingLayer): void {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;

        const t = this.transform;
        renderingLayer.setMatrixToTransform(t);
        ctx.fillRect(0, 0, 50, 100);

        ctx.moveTo(-t.origin.x * pxs, -t.origin.y * pxs);
        if (this._imageData) {
            // ctx.putImageData(this._imageData, 0, 0);
            ctx.drawImage(this._imageData as any, 0, 0);
        } else {
            throw new Error("WorleyNoise is not generated.");
        }

        renderingLayer.resetMatrix();

        if (renderingLayer.gizmoVisibility && this.renderGizmo) this.renderGizmo(renderingLayer);
    }


    renderGizmo(renderingLayer: IRenderingLayer) {
        renderingLayer.setMatrixToTransform(this.transform);
        Gizmo.origin(renderingLayer, Vector.zero(), Gizmo.mediaColor);
        renderingLayer.resetMatrix();
    }
}


export interface IPixelModifierCallback {
    (red: number, green: number, blue: number, alpha: number, x: number, y: number, pixelIndex: number): IColorRGBA;
}