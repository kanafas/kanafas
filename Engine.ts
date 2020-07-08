import { IRenderingLayer, RenderingLayer } from "./RenderingLayer.js";
import { Loop } from "./Loop.js";
import { Transform } from "./properties/Transform.js";
// import { DebuggerBar } from "./Debugger/DebuggerBar.js";


export class Engine implements IRenderingLayer {

    readonly loop: Loop;

    private _renderingLayer: RenderingLayer;

    get pixelScale(): number { return this._renderingLayer.pixelScale; }

    get width(): number { return this._renderingLayer.width; }
    get height(): number { return this._renderingLayer.height; }

    set gizmoVisibility(toggle: boolean) { this._renderingLayer.gizmoVisibility = toggle; }
    get gizmoVisibility(): boolean { return this._renderingLayer.gizmoVisibility; }

    set gizmoScale(scale: number) { this._renderingLayer.gizmoScale = scale; }
    get gizmoScale(): number { return this._renderingLayer.gizmoScale; }


    // debuggerBar: DebuggerBar;


    constructor(canvas: HTMLCanvasElement, width: number, height: number, pixelScale?: number) {
        this._renderingLayer = new RenderingLayer(canvas, width, height, pixelScale);
        this.loop = new Loop();
        // this.debuggerBar = new DebuggerBar(this);

        // this.loop.addUpdateCallback((milliseconds: number, delta: number) => this.debuggerBar.update(milliseconds, delta));
    }


    clear() {
        this._renderingLayer.clear();
    }


    getRenderingContext(): CanvasRenderingContext2D {
        return this._renderingLayer.getRenderingContext();
    }


    resetRenderingContext() {
        this._renderingLayer.resetRenderingContext();
    }


    setImageSmoothing(toggle: boolean) {
        this._renderingLayer.setImageSmoothing(toggle);
    }


    getCanvas(): HTMLCanvasElement {
        return this._renderingLayer.getCanvas();
    }


    setMatrixToTransform(transform: Transform) {
        this._renderingLayer.setMatrixToTransform(transform);
    }


    resetMatrix() {
        this._renderingLayer.resetMatrix();
    }
}