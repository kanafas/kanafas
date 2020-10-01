// import { DebuggerBar } from "./Debugger/DebuggerBar.js"; TODO: Dodělat gizma
import { RenderingLayer } from "./RenderingLayer.js";
import { Loop } from "../repeaters/Loop.js";
export class Engine {
    // debuggerBar: DebuggerBar;
    constructor(canvas, width, height, pixelScale) {
        this._renderingLayer = new RenderingLayer(canvas, width, height, pixelScale);
        this.loop = new Loop();
        // this.debuggerBar = new DebuggerBar(this);
        // this.loop.addUpdateCallback((milliseconds: number, delta: number) => this.debuggerBar.update(milliseconds, delta));
    }
    get pixelScale() { return this._renderingLayer.pixelScale; }
    get width() { return this._renderingLayer.width; }
    get height() { return this._renderingLayer.height; }
    set gizmoVisibility(toggle) { this._renderingLayer.gizmoVisibility = toggle; }
    get gizmoVisibility() { return this._renderingLayer.gizmoVisibility; }
    set gizmoScale(scale) { this._renderingLayer.gizmoScale = scale; }
    get gizmoScale() { return this._renderingLayer.gizmoScale; }
    updateSize(width, height, pixelScale) {
        this._renderingLayer.updateSize(width, height, pixelScale);
    }
    clear() {
        this._renderingLayer.clear();
    }
    getRenderingContext() {
        return this._renderingLayer.getRenderingContext();
    }
    resetRenderingContext() {
        this._renderingLayer.resetRenderingContext();
    }
    setImageSmoothing(toggle) {
        this._renderingLayer.setImageSmoothing(toggle);
    }
    getCanvas() {
        return this._renderingLayer.getCanvas();
    }
    setMatrixToTransform(transform) {
        this._renderingLayer.setMatrixToTransform(transform);
    }
    resetMatrix() {
        this._renderingLayer.resetMatrix();
    }
}
