import { IBoundingBox } from "../renderables/IBoundingBox.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";
import { IClonable } from "../core/IClonable.js";


type getStyleCallback = {
    (renderingLayer: IRenderingLayer, boundingBox: IBoundingBox): string | CanvasGradient | CanvasPattern
}

export interface IStyle {
    computeStyle: getStyleCallback
}


export class Style implements IStyle, IClonable<Style> {

    private _style: IStyle;


    constructor(style: EntryType_Style) {
        this._style = Style._parseEntryType_Style(style);
    }


    computeStyle(renderingLayer: IRenderingLayer, boundingBox: IBoundingBox): string | CanvasGradient | CanvasPattern {
        const v = this._style.computeStyle(renderingLayer, boundingBox);
        return v;
    }


    setStyle(style: EntryType_Style) {
        this._style = Style._parseEntryType_Style(style);
    }


    getStyle() {
        return this._style;
    }


    clone(): Style {
        const thisStyle = this._style as any;
        const style = thisStyle.hasOwnProperty('clone') ? thisStyle.clone() : { ...this._style };

        return new Style(style);
    }


    private static _parseEntryType_Style(raw: EntryType_Style): IStyle {
        const style = raw;

        if (typeof style === 'object' && typeof (style as IStyle).computeStyle === 'function') {
            return style as IStyle;
        } else {
            return {
                computeStyle: (renderingLayer: IRenderingLayer, boundingBox: IBoundingBox) => {
                    return style as string | CanvasGradient | CanvasPattern;
                }
            }
        }
    }
}


export type EntryType_Style =
    | IStyle
    | string
    | CanvasGradient
    | CanvasPattern;