export class Style {
    constructor(style) {
        this._style = Style._parseEntryType_Style(style);
    }
    computeStyle(renderingLayer, boundingBox) {
        const v = this._style.computeStyle(renderingLayer, boundingBox);
        return v;
    }
    setStyle(style) {
        this._style = Style._parseEntryType_Style(style);
    }
    getStyle() {
        return this._style;
    }
    clone() {
        const thisStyle = this._style;
        const style = thisStyle.hasOwnProperty('clone') ? thisStyle.clone() : { ...this._style };
        return new Style(style);
    }
    static _parseEntryType_Style(raw) {
        const style = raw;
        if (typeof style === 'object' && typeof style.computeStyle === 'function') {
            return style;
        }
        else {
            return {
                computeStyle: (renderingLayer, boundingBox) => {
                    return style;
                }
            };
        }
    }
}
