import { IBoundingBox } from "../renderables/IBoundingBox.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";
import { IClonable } from "../core/IClonable.js";


type getStyleCallback = {
    (renderingLayer: IRenderingLayer, boundingBox: IBoundingBox): string | CanvasGradient | CanvasPattern
}

export interface IStyle {
    getStyle: getStyleCallback
}


export class Style implements IStyle, IClonable<Style> {

    private _style: IStyle;

    constructor(style: IStyle | string | CanvasGradient | CanvasPattern) {
        if (typeof style === 'object' && style.hasOwnProperty('getStyle')) {
            this._style = style as IStyle;
        } else {
            this._style = {
                getStyle: (renderingLayer: IRenderingLayer, boundingBox: IBoundingBox) => {
                    return style as string | CanvasGradient | CanvasPattern;
                }
            }
        }
    }


    getStyle(renderingLayer: IRenderingLayer, boundingBox: IBoundingBox): string | CanvasGradient | CanvasPattern {
        return this._style.getStyle(renderingLayer, boundingBox);
    }


    clone(): Style {
        const thisStyle = this._style as any;
        const style = thisStyle.hasOwnProperty('clone') ? thisStyle.clone() : { ...this._style };

        return new Style(style);
    }

}