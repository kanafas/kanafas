import { Transform } from "../properties/Transform.js";


export class RenderingLayer implements IRenderingLayer {

    readonly pixelScale: number;

    readonly width: number;
    readonly height: number;

    private _canvas: HTMLCanvasElement;
    private _renderingContext: CanvasRenderingContext2D;

    gizmoVisibility: boolean = false;
    gizmoScale: number = 1;


    constructor(canvas: HTMLCanvasElement, width: number, height: number, pixelScale: number = 1) {
        this.pixelScale = pixelScale;

        this.width = width;
        this.height = height;

        this._canvas = canvas;
        this._canvas.width = width * pixelScale;
        this._canvas.height = height * pixelScale;

        this._renderingContext = this._canvas.getContext('2d')!;
    }


    clear() {
        const pxs = this.pixelScale;

        this.resetMatrix();
        this._renderingContext.clearRect(0, 0, this.width * pxs, this.height * pxs);
    }


    getRenderingContext(): CanvasRenderingContext2D {
        return this._renderingContext;
    }


    resetRenderingContext() {
        this._renderingContext = this._canvas.getContext('2d')!;
    }


    setImageSmoothing(toggle: boolean) {
        const ctx = this.getRenderingContext();

        (ctx as any).msImageSmoothingEnabled = toggle;
        (ctx as any).mozImageSmoothingEnabled = toggle;
        (ctx as any).webkitImageSmoothingEnabled = toggle;
        ctx.imageSmoothingEnabled = toggle;
    }


    getCanvas(): HTMLCanvasElement {
        return this._canvas;
    }


    setMatrixToTransform(transform: Transform) {
        this.resetMatrix();

        const pxs = this.pixelScale;
        const path: Transform[] = [];

        let t: Transform = transform;
        path.unshift(t);

        while (t.hasParent()) {
            t = t.getParent();
            path.unshift(t);
        }

        path.forEach(t => {
            this._renderingContext.translate(t.position.x * pxs, t.position.y * pxs);
            this._renderingContext.rotate(t.rotation.radians);
            this._renderingContext.scale(t.scale.x, t.scale.y);
        });
    }


    resetMatrix() {
        this._renderingContext.resetTransform();
    }
}


export interface IRenderingLayer {

    readonly pixelScale: number;

    readonly width: number;
    readonly height: number;

    gizmoVisibility: boolean;
    gizmoScale: number;

    clear(): void;

    getRenderingContext(): CanvasRenderingContext2D;
    resetRenderingContext(): void;

    setImageSmoothing(toggle: boolean): void;

    getCanvas(): HTMLCanvasElement;

    setMatrixToTransform(transform: Transform): void;
    resetMatrix(): void;
}