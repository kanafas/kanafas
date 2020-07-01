import { Utils } from "../utils/index.js";
import { Vector } from "../units/Vector.js";
import { IRenderingLayer } from "../RenderingLayer.js";
import { IBoxArea } from "../renderables/types.js";
import { IGradient, IGradientStep } from "./Gradient.js";


export class LinearGradient implements IGradient {
    
    start: Vector;
    end: Vector;

    steps: IGradientStep[] = [];

    constructor(start: Vector, end: Vector, steps: IGradientStep[]) {
        this.start = start;
        this.end = end;
        this.steps = steps;
    }


    getStyle(renderingLayer: IRenderingLayer, boundingBox: IBoxArea) {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;
        
         // TODO: Zkontrolovat jestli "origin" přičítám, nebo odčítáms
        const startPoint = this.start.clone().multiple(boundingBox.size).add(boundingBox.origin);
        const endPoint = this.end.clone().multiple(boundingBox.size).add(boundingBox.origin);

        const gradient = ctx.createLinearGradient(
            startPoint.x * pxs,
            startPoint.y * pxs,
            endPoint.x * pxs,
            endPoint.y * pxs
        );

        this.steps.forEach(step => {
            const offset: number = Utils.Numbers.limit(step.offset, 0, 1);
            const color = `rgba(${step.color.red.toFixed(3)}, ${step.color.green.toFixed(3)}, ${step.color.blue.toFixed(3)}, ${step.color.alpha.toFixed(3)})`;

            gradient.addColorStop(offset, color);
        });
        
        return gradient;
    }
}