import { Utils } from "../Utils/Utils.js";
import { Vector } from "../units/Vector.js";
import { IRenderingLayer } from "../RenderingLayer.js";
import { Transform } from "../properties/Transform.js";
import { Fill } from "../properties/Fill.js";
import { Stroke } from "../properties/Stroke.js";
import { Font } from "../properties/Font.js";
import { Shadow } from "../properties/Shadow.js";
import { Color } from "../styles/Color.js";
import { Gizmo } from "../renderables/Gizmo.js";
import { IBoxArea } from "./IArea.js";
import { IObject } from "./IObject.js";
import { IRenderable } from "./IRenderable.js";
import { IShape } from "./IVisible.js";


export class TextObject implements IObject, IRenderable, IShape {

    transform: Transform = new Transform();

    private _contentLines: string[] = [];
    get content(): string {
        return this._contentLines.join('\n');
    }
    set content(content: string) {
        this._contentLines = content.split(Utils.Regex.breakLines());
    }

    fill: Fill | null = new Fill(Color.black());
    stroke: Stroke | null = null;
    font: Font = new Font();

    shadow: Shadow | null = null;
    opacity: number = 1;

    constructor(content: string) {
        this.content = content;
    }


    getBoundingBox(renderingLayer: IRenderingLayer): IBoxArea {
        const ctx = renderingLayer.getRenderingContext();

        let width: number = 0;
        let height: number = 0;

        this._contentLines.forEach((line, i) => {
            const w = ctx.measureText(line).width;

            if (width < w) width = w;
            height += this.font.lineHeight
        });

        return {
            origin: this.transform.origin.clone(),
            size: new Vector(width, height),
        }
    }


    render(renderingLayer: IRenderingLayer) {
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
            } else {
                Shadow.clear(renderingLayer);
            }

            if (this.fill) {
                this.fill.apply(renderingLayer, this.getBoundingBox(renderingLayer));
                ctx.fillText(line, 0, (i + 1) * lineheight);
            } else {
                Fill.clear(renderingLayer);
            }

            if (this.stroke) {
                this.stroke.apply(renderingLayer, this.getBoundingBox(renderingLayer));
                ctx.strokeText(line, 0, (i + 1) * lineheight);
            } else {
                Stroke.clear(renderingLayer);
            }
        });

        renderingLayer.resetMatrix();

        ctx.globalAlpha = 1;

        if (renderingLayer.gizmoVisibility && this.renderGizmos) this.renderGizmos(renderingLayer);
    }


    renderGizmos(renderingLayer: IRenderingLayer) {
        renderingLayer.setMatrixToTransform(this.transform);
        Gizmo.origin(renderingLayer, Vector.zero(), Gizmo.textColor);
        renderingLayer.resetMatrix();
    }
}