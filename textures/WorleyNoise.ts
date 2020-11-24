import { IClonable } from "../core/IClonable.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";
import { Gizmo } from "../debugger/Gizmo.js";
import { Shadow, Transform } from "../properties/index.js";
import { IBoundingBox } from "../renderables/index.js";
import { IColorRGBA } from "../styles/Color.js";
import { Vector } from "../units/index.js";
import { Numbers } from "../utils/Numbers.js";
import { ITexture } from "./ITexture.js";


export class WorleyNoise implements ITexture, IClonable<WorleyNoise> {

    points: Vector[] = [];
    limitMin: number = 0;
    limitMax: number = 255;
    contrast: number = 1;

    readonly width: number;
    readonly height: number;

    transform: Transform = new Transform();

    shadow: Shadow | null = null;
    opacity: number = 1;


    private _shadowCanvas: HTMLCanvasElement | null = null;
    private _pixelModifierCallback: IPixelModifierCallback = (red: number, green: number, blue: number, alpha: number, x: number, y: number, pixelIndex: number) => {
        return { red, green, blue, alpha: 1 }
    }


    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }


    setPixelModifierCallback(callback: IPixelModifierCallback): void {
        this._pixelModifierCallback = callback;
    }


    async generate(renderingLayer: IRenderingLayer): Promise<void> {
        const promise = new Promise<void>((resolve, reject) => {
            const width = this.width * renderingLayer.pixelScale;
            const height = this.height * renderingLayer.pixelScale;

            const canvas = document.createElement('canvas') as HTMLCanvasElement;
            canvas.width = width;
            canvas.height = height;
            
            const ctx = canvas.getContext('2d')!;

            const imageData = ctx.createImageData(width, height);
            const buffer = new Uint8Array(imageData.data.buffer);

            const nClosest = 0;

            for (let x = 0; x < this.width; x++) {
                for (let y = 0; y < this.height; y++) {
                    const pixelIndex = x + y * this.width;
                    const channelIndex = pixelIndex * 4;

                    const distances: number[] = Array(this.points.length);

                    for (let i = 0; i < this.points.length; i++) {
                        const point = this.points[i];

                        const d = Vector.distance({ x, y }, point); // Připočítat retinu
                        distances[i] = d;
                    }

                    const sortedDistances = distances.sort((a, b) => a - b);

                    const nClosestDistance = sortedDistances[Math.min(nClosest, sortedDistances.length - 1)] * this.contrast;
                    const noise = Numbers.remap(
                        Numbers.limit(nClosestDistance, this.limitMin, this.limitMax),
                        this.limitMin, this.limitMax, 0, 255);

                    const color = this._pixelModifierCallback(noise, noise, noise, noise, x, y, pixelIndex);

                    buffer[channelIndex + 0] = color.red;
                    buffer[channelIndex + 1] = color.green;
                    buffer[channelIndex + 2] = color.blue;
                    buffer[channelIndex + 3] = color.alpha * 255;
                }
            }

            ctx.putImageData(imageData, 0, 0);
            this._shadowCanvas = canvas;

            resolve();
        });
    }


    getBoundingBox(renderingLayer: IRenderingLayer): IBoundingBox {
        return {
            origin: this.transform.origin.clone(),
            size: new Vector(this.width, this.height),
        }
    }



    render(renderingLayer: IRenderingLayer): void {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;

        const t = this.transform;
        renderingLayer.setMatrixToTransform(t);

        ctx.moveTo(-t.origin.x * pxs, -t.origin.y * pxs);

        if (this._shadowCanvas) {
            ctx.drawImage(this._shadowCanvas, 0, 0, this.width * pxs, this.height * pxs);
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


    clone(): WorleyNoise {
        const texture = new WorleyNoise(this.width, this.height);
        texture.points = this.points.map(p => p.clone());
        texture.limitMin = this.limitMin;
        texture.limitMax = this.limitMax;
        texture.contrast = this.contrast;

        texture.transform = this.transform.clone();
        texture.shadow = this.shadow?.clone() ?? null;
        texture.opacity = this.opacity;

        return texture;
    }


    static getRandomPoints(width: number, height: number, count: number): Vector[] {
        const points: Vector[] = [];

        for (let i = 0; i < count; i++) {
            const p = new Vector(Math.random() * width, Math.random() * height);
            points.push(p);
        }

        return points;
    }
}


export interface IPixelModifierCallback {
    (red: number, green: number, blue: number, alpha: number, x: number, y: number, pixelIndex: number): IColorRGBA;
}