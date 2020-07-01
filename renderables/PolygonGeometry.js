import { Vector } from "../units/Vector.js";
import { Transform } from "../properties/Transform.js";
import { Utils } from "../Utils/Utils.js";
export class PolygonGeometry {
    constructor(points, closed = true, trimStart = 0, trimEnd = 1, trimOffset = 0) {
        this.transform = new Transform();
        this.points = points;
        this.closed = closed;
        this.trimEnd = trimEnd;
        this.trimStart = trimStart;
        this.trimOffset = trimOffset;
    }
    contructMatrix(renderingLayer) {
        const t = this.transform;
        renderingLayer.setMatrixToTransform(t);
    }
    destructMatrix(renderingLayer) {
        renderingLayer.resetMatrix();
    }
    drawWithoutMatrixManipulation(renderingLayer) {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;
        const t = this.transform;
        // 
        const trimOffsetRatio = ((v) => {
            while (v < 0)
                v += 1;
            while (v > 1)
                v -= 1;
            return v;
        })(this.trimOffset);
        const trimStartRatio = Utils.Numbers.limit(this.trimStart, 0, 1) + trimOffsetRatio;
        const trimEndRatio = Utils.Numbers.limit(this.trimEnd, 0, 1) + trimOffsetRatio;
        const segments = this.points.map((start, i, arr) => {
            const end = i + 1 < arr.length ? arr[i + 1] : arr[0];
            const line = Vector.zero().add(end).subtract(start);
            return { start, end, line };
        }).slice(0, this.closed ? this.points.length : this.points.length - 1);
        const circuit = segments.reduce((acc, s) => acc + s.line.length, 0);
        const trimStartLength = trimStartRatio * circuit;
        const trimEndLength = trimEndRatio * circuit;
        let alreadyDrawn = 0;
        ctx.beginPath();
        ctx.translate(-t.origin.x * pxs, t.origin.y * pxs);
        ctx.moveTo(0, 0);
        segments.forEach(s => {
            alreadyDrawn = this._drawSegmentLine(renderingLayer, s.line, alreadyDrawn, trimStartLength, trimEndLength);
        });
        if (1 < trimEndRatio) {
            if (!this.closed) {
                const reset = segments.reduce((acc, s) => {
                    return acc.subtract(s.line);
                }, Vector.zero());
                ctx.moveTo(reset.x * pxs, reset.y * pxs);
                ctx.translate(reset.x * pxs, reset.y * pxs);
            }
            let overflowAlreadyDrawn = 0;
            for (let i = 0; i < segments.length; i++) {
                const s = segments[i];
                overflowAlreadyDrawn = this._drawSegmentLine(renderingLayer, s.line, overflowAlreadyDrawn, 0, (trimEndLength - circuit));
                if (overflowAlreadyDrawn > trimEndLength - circuit)
                    break;
            }
        }
        if (this.closed && (trimStartRatio != trimEndRatio && trimStartRatio - trimEndRatio == 0)) {
            console.log("CLOSED");
            ctx.closePath();
        }
    }
    _drawSegmentLine(renderingLayer, segmentLine, alreadyDrawn, trimStartLength, trimEndLength) {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;
        if (trimEndLength >= (alreadyDrawn + segmentLine.length) && trimStartLength <= alreadyDrawn) {
            // FULL
            ctx.lineTo(segmentLine.x * pxs, segmentLine.y * pxs);
        }
        else if (trimEndLength >= (alreadyDrawn + segmentLine.length) && trimStartLength < (alreadyDrawn + segmentLine.length) && trimStartLength >= alreadyDrawn) {
            // GAP BEFORE
            const beforeGapModifier = (trimStartLength - alreadyDrawn) / segmentLine.length;
            if (beforeGapModifier > 0) {
                const v = segmentLine.clone().multiple(beforeGapModifier);
                ctx.moveTo(v.x * pxs, v.y * pxs);
            }
            ctx.lineTo(segmentLine.x * pxs, segmentLine.y * pxs);
        }
        else if (trimEndLength > alreadyDrawn && trimStartLength <= alreadyDrawn) {
            // GAP AFTER
            const afterLength = segmentLine.length - (trimEndLength - alreadyDrawn);
            const lineLength = segmentLine.length - afterLength;
            const lineModifier = lineLength / segmentLine.length;
            const v = segmentLine.clone().multiple(lineModifier);
            ctx.lineTo(v.x * pxs, v.y * pxs);
            if (afterLength > 0) {
                const afterGapModifier = afterLength / segmentLine.length;
                const v = segmentLine.clone().multiple(afterGapModifier);
                ctx.moveTo(v.x * pxs, v.y * pxs);
            }
        }
        else if (trimEndLength > alreadyDrawn && trimStartLength < (alreadyDrawn + segmentLine.length) && trimStartLength > alreadyDrawn) {
            // BETWEEN
            const beforeLength = trimStartLength - alreadyDrawn;
            const afterLength = segmentLine.length - (trimEndLength - alreadyDrawn);
            const lineLength = segmentLine.length - (beforeLength + afterLength);
            if (beforeLength > 0) {
                const beforeGapModifier = beforeLength / segmentLine.length;
                const v = segmentLine.clone().multiple(beforeGapModifier);
                ctx.moveTo(v.x * pxs, v.y * pxs);
            }
            const lineModifier = (lineLength + beforeLength) / segmentLine.length;
            const v = segmentLine.clone().multiple(lineModifier);
            ctx.lineTo(v.x * pxs, v.y * pxs);
            if (afterLength > 0) {
                const afterGapModifier = afterLength / segmentLine.length;
                const v = segmentLine.clone().multiple(afterGapModifier);
                ctx.moveTo(v.x * pxs, v.y * pxs);
            }
        }
        else {
            // NONE
            ctx.moveTo(segmentLine.x * pxs, segmentLine.y * pxs);
        }
        ctx.translate(segmentLine.x * pxs, segmentLine.y * pxs);
        return alreadyDrawn += segmentLine.length;
    }
    draw(renderingLayer) {
        this.contructMatrix(renderingLayer);
        this.drawWithoutMatrixManipulation(renderingLayer);
        this.destructMatrix(renderingLayer);
    }
    getBoundingBox(renderingLayer) {
        const width = Math.max(...this.points.map(p => p.x));
        const height = Math.max(...this.points.map(p => p.y));
        return {
            origin: this.transform.origin.clone(),
            size: new Vector(width, height),
        };
    }
}
