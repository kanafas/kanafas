export class Style {
    constructor(style) {
        if (typeof style === 'object' && style.hasOwnProperty('getStyle')) {
            this._style = style;
        }
        else {
            this._style = {
                getStyle: (renderingLayer, boundingBox) => {
                    return style;
                }
            };
        }
    }
    getStyle(renderingLayer, boundingBox) {
        return this._style.getStyle(renderingLayer, boundingBox);
    }
    clone() {
        const thisStyle = this._style;
        const style = thisStyle.hasOwnProperty('clone') ? thisStyle.clone() : { ...this._style };
        return new Style(style);
    }
}
