export class Font {
    constructor(size = 12, family = 'sans-serif') {
        this.weight = 400;
        this.italic = false;
        this.letterSpacing = 0;
        this.features = [];
        this.align = "left";
        this.baseline = "alphabetic";
        this.size = size;
        this.lineHeight = this.size * 1.5;
        this.family = family;
    }
    apply(renderingLayer) {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;
        const canvas = renderingLayer.getCanvas();
        canvas.style.letterSpacing = `${this.letterSpacing}em`;
        canvas.style.fontFeatureSettings = this.features.length > 0 ? this.features.map(f => `"${f}"`).join(', ') : 'initial';
        const fontSize = this.size * pxs;
        const font = [
            this.weight.toFixed(0),
            `${fontSize.toFixed(0)}px`,
            this.italic ? 'italic' : '',
            this.family,
        ].join(' ');
        ctx.font = font;
        ctx.textAlign = this.align;
    }
    clone() {
        const f = new Font();
        f.size = this.size;
        f.family = this.family;
        f.size = this.size;
        f.weight = this.weight;
        f.italic = this.italic;
        f.lineHeight = this.lineHeight;
        f.letterSpacing = this.letterSpacing;
        f.features = this.features;
        f.align = this.align;
        f.baseline = this.baseline;
        return f;
    }
    static clear(renderingLayer) {
        const canvas = renderingLayer.getCanvas();
        canvas.style.letterSpacing = `0em`;
        canvas.style.fontFeatureSettings = 'initial';
        const ctx = renderingLayer.getRenderingContext();
        ctx.font = "10px sans-serif";
    }
}
