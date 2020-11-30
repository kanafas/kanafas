// import { DebuggerBar } from "./Debugger/DebuggerBar.js"; TODO: Dodělat gizma
import { RenderingLayer } from "./RenderingLayer.js";
import { Loop } from "../repeaters/Loop.js";
export class Engine extends RenderingLayer {
    constructor(canvas, width, height, pixelScale, updateSize) {
        super(canvas, width, height, pixelScale, updateSize);
        this.loop = new Loop();
        // this.debuggerBar = new DebuggerBar(this);
        // this.loop.addUpdateCallback((milliseconds: number, delta: number) => this.debuggerBar.update(milliseconds, delta));
    }
}
