import { Transform } from "../properties/Transform.js";


export class RenderingLayer implements IRenderingLayer {

    static readonly DEFAULT_UPDATESIZE_CALLBACK = (canvas: HTMLCanvasElement, width: number, height: number, pixelScale: number): void => {
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
    }

    static get PIXELSCALE(): number { return window.devicePixelRatio; }


    private _pixelScale: number = 1;
    get pixelScale(): number { return this._pixelScale; }

    private _width: number = 0;
    private _height: number = 0;
    get width(): number { return this._width; }
    get height(): number { return this._height; }

    private _canvas: HTMLCanvasElement;
    private _renderingContext!: CanvasRenderingContext2D;

    gizmoVisibility: boolean = false;
    gizmoScale: number = 1;


    constructor(canvas: HTMLCanvasElement, width: number, height: number, pixelScale: number = 1) {
        this._canvas = canvas;
        this.updateSize(width, height, !isNaN(pixelScale) ? pixelScale : 1);
    }


    updateSize(width: number, height: number, pixelScale: number = NaN) {
        if (!isNaN(pixelScale)) this._pixelScale = Math.max(pixelScale, 0);

        this._width = Math.max(width, 0);
        this._height = Math.max(height, 0);

        this._canvas.width = width * pixelScale;
        this._canvas.height = height * pixelScale;

        if (this.updateSizeStyleCallback !== null) this.updateSizeStyleCallback(this._canvas, width, height, this._pixelScale);

        this._renderingContext = this._canvas.getContext('2d')!;
    }


    updateSizeStyleCallback: updateSizeStyleCallbackType = RenderingLayer.DEFAULT_UPDATESIZE_CALLBACK;


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

    updateSize(width: number, height: number, pixelScale: number): void;

    updateSizeStyleCallback: updateSizeStyleCallbackType;

    clear(): void;

    getRenderingContext(): CanvasRenderingContext2D;
    resetRenderingContext(): void;

    setImageSmoothing(toggle: boolean): void;

    getCanvas(): HTMLCanvasElement;

    setMatrixToTransform(transform: Transform): void;
    resetMatrix(): void;
}


export type updateSizeStyleCallbackType =  null | {
    (canvas: HTMLCanvasElement, width: number, height: number, pixelScale: number): void;
};