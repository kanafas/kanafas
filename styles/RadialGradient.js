import { Utils } from "../utils/Utils.js";
import { Gradient } from "./Gradient.js";
export class RadialGradient extends Gradient {
    computeStyle(renderingLayer, boundingBox) {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;
        const centerPoint = this.start.clone()
            .multiple(boundingBox.size)
            .add(boundingBox.origin)
            .absolute();
        const radiusPoint = this.end.clone()
            .multiple(boundingBox.size)
            .add(boundingBox.origin)
            .absolute();
        if (centerPoint.isEquals(radiusPoint) == false) {
            const gradient = ctx.createRadialGradient(centerPoint.x * pxs, centerPoint.y * pxs, 0, centerPoint.x * pxs, centerPoint.y * pxs, radiusPoint.subtract(centerPoint).length * pxs);
            this.steps.forEach(step => {
                const offset = Utils.Numbers.limit(step.offset, 0, 1);
                const color = `rgba(${step.color.red.toFixed(3)}, ${step.color.green.toFixed(3)}, ${step.color.blue.toFixed(3)}, ${step.color.alpha.toFixed(3)})`;
                gradient.addColorStop(offset, color);
            });
            return gradient;
        }
        else {
            const gradient = ctx.createRadialGradient(0, 0, 0, 1, 1, 1);
            const step = this.steps[this.steps.length - 1];
            const color = `rgba(${step.color.red.toFixed(3)}, ${step.color.green.toFixed(3)}, ${step.color.blue.toFixed(3)}, ${step.color.alpha.toFixed(3)})`;
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, color);
            return gradient;
        }
    }
}
