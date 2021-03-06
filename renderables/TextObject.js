import { Transform } from "./../properties/Transform.js";
import { Utils } from "./../utils/Utils.js";
import { Color } from "./../styles/Color.js";
import { Fill } from "./../properties/Fill.js";
import { Stroke } from "./../properties/Stroke.js";
import { Vector } from "./../units/Vector.js";
import { Shadow } from "./../properties/Shadow.js";
import { Font } from "./../properties/Font.js";
import { Gizmo } from "./../debugger/Gizmo.js";
export class TextObject {
    constructor(content) {
        this.transform = new Transform();
        this._contentLines = [];
        this.fill = new Fill(Color.Black);
        this.stroke = null;
        this.font = new Font();
        this.shadow = null;
        this.opacity = 1;
        this.content = content;
    }
    get content() {
        return this._contentLines.join('\n');
    }
    set content(content) {
        this._contentLines = content.split(Utils.Regex.breakLines());
    }
    getBoundingBox(renderingLayer) {
        this.font.apply(renderingLayer);
        const ctx = renderingLayer.getRenderingContext();
        let width = 0;
        let height = 0;
        this._contentLines.forEach((line, i) => {
            const w = ctx.measureText(line).width;
            if (width < w)
                width = w;
            height += this.font.lineHeight;
        });
        return {
            origin: this.transform.origin.clone(),
            size: new Vector(Math.ceil(width), Math.ceil(height)),
        };
    }
    render(renderingLayer) {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;
        const t = this.transform;
        ctx.globalAlpha = Utils.Numbers.limit(this.opacity, 0, 1);
        renderingLayer.setMatrixToTransform(t);
        ctx.moveTo(-t.origin.x, -t.origin.y);
        this.font.apply(renderingLayer);
        const lineheight = this.font.lineHeight * pxs;
        this._contentLines.forEach((line, i) => {
            if (this.shadow) {
                this.shadow.apply(renderingLayer, this.getBoundingBox(renderingLayer));
            }
            else {
                Shadow.clear(renderingLayer);
            }
            if (this.fill) {
                this.fill.apply(renderingLayer, this.getBoundingBox(renderingLayer));
                ctx.fillText(line, 0, (i + 1) * lineheight);
            }
            else {
                Fill.clear(renderingLayer);
            }
            if (this.stroke) {
                this.stroke.apply(renderingLayer, this.getBoundingBox(renderingLayer));
                ctx.strokeText(line, 0, (i + 1) * lineheight);
            }
            else {
                Stroke.clear(renderingLayer);
            }
        });
        renderingLayer.resetMatrix();
        ctx.globalAlpha = 1;
        if (renderingLayer.gizmoVisibility && this.renderGizmo)
            this.renderGizmo(renderingLayer);
    }
    renderGizmo(renderingLayer) {
        renderingLayer.setMatrixToTransform(this.transform);
        Gizmo.origin(renderingLayer, Vector.Zero, Gizmo.textColor);
        renderingLayer.resetMatrix();
    }
    clone() {
        const text = new TextObject(this.content);
        text.transform = this.transform.clone();
        text.fill = this.fill?.clone() ?? null;
        text.stroke = this.stroke?.clone() ?? null;
        text.font = this.font?.clone() ?? null;
        text.shadow = this.shadow?.clone() ?? null;
        text.opacity = this.opacity;
        return text;
    }
}
