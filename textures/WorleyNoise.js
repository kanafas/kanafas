import { Vector } from "../units/index.js";
import { Numbers } from "../utils/Numbers.js";
export class WorleyNoise {
    constructor(width, height, pointCount, contrast = 1) {
        this.points = [];
        this.width = width;
        this.height = height;
        this.contrast = contrast;
        for (let i = 0; i < pointCount; i++) {
            const p = new Vector(Math.random() * this.width, Math.random() * this.height);
            this.points.push(p);
        }
    }
    render(renderingLayer) {
        const ctx = renderingLayer.getRenderingContext();
        const imageData = ctx.createImageData(this.width, this.height);
        const buffer = new Uint8Array(imageData.data.buffer);
        const nClosest = 0;
        console.time();
        for (let x = 0; x < this.width; x += 2) {
            for (let y = 0; y < this.height; y += 2) {
                const pixelIndex = x + y * this.width;
                const channelIndex = pixelIndex * 4;
                const distances = Array(this.points.length);
                for (let i = 0; i < this.points.length; i++) {
                    const point = this.points[i];
                    const dist = Vector.distance({ x, y }, point);
                    distances[i] = dist;
                }
                const sortedDistances = distances.sort((a, b) => a - b);
                // const nClosestDistance = sortedDistances[Math.min(nClosest, sortedDistances.length -1)];
                const nClosestDistance = sortedDistances[nClosest] / (Math.max(this.width, this.height)) * 1024 * this.contrast;
                sortedDistances[nClosest];
                // const noise = Numbers.remap(nClosestDistance, 0, 100, 255, 0);
                const noise = nClosestDistance;
                const tint = Numbers.limit(noise, 0, 255);
                const red = tint;
                const green = tint;
                const blue = tint;
                const alpha = 255;
                buffer[channelIndex + 0] = red;
                buffer[channelIndex + 1] = green;
                buffer[channelIndex + 2] = blue;
                buffer[channelIndex + 3] = alpha;
            }
        }
        ctx.putImageData(imageData, 0, 0);
        console.timeEnd();
        // Smazat
        for (let i = 0; i < this.points.length; i++) {
            const p = this.points[i];
            ctx.fillStyle = "#ffff00";
            ctx.closePath();
            ctx.ellipse(p.x, p.y, 2, 2, 0, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }
}
