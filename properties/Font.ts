import { IClonable } from "../core/IClonable.js";
import { IRenderingLayer } from "../core/RenderingLayer.js";


export class Font implements IClonable<Font> {

    family: string;
    size: number;
    weight: number = 400;
    italic: boolean = false;
    lineHeight: number;
    letterSpacing: number = 0;
    features: FontFeatures[] = [];
    align: CanvasTextAlign = "left";
    baseline: CanvasTextBaseline = "alphabetic";


    constructor(size: number = 12, family: string = 'sans-serif') {
        this.size = size;
        this.lineHeight = this.size * 1.5;

        this.family = family;
    }


    apply(renderingLayer: IRenderingLayer): void {
        const ctx = renderingLayer.getRenderingContext();
        const pxs = renderingLayer.pixelScale;

        const canvas = renderingLayer.getCanvas();
        canvas.style.letterSpacing = `${this.letterSpacing}em`;
        canvas.style.fontFeatureSettings = this.features.length > 0 ? this.features.map(f => `"${f}"`).join(', ') : 'initial';

        const fontSize = this.size * pxs;

        const font: string = [
            this.weight.toFixed(0),
            `${fontSize.toFixed(0)}px`,
            this.italic ? 'italic' : '',
            this.family,
        ].join(' ');

        ctx.font = font;
        ctx.textAlign = this.align;
    }


    clone(): Font {
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


    static clear(renderingLayer: IRenderingLayer) {
        const canvas = renderingLayer.getCanvas();
        canvas.style.letterSpacing = `0em`;
        canvas.style.fontFeatureSettings = 'initial';

        const ctx = renderingLayer.getRenderingContext();
        ctx.font = "10px sans-serif";
    }

}


export const enum FontFeatures {
    StandardLigatures = 'liga',
    ContextualAlternates = 'calt',
    DiscretionaryLigatures = 'dlig',
    SmallSaps = 'smcp',
    CapitalsToSmallCaps = 'c2sc',
    Swashes = 'swsh',
    StylisticAlternates = 'salt',
    LiningFigures = 'lnum',
    OldstyleFigures = 'onum',
    ProportionalFigures = 'pnum',
    TabularFigures = 'tnum',
    Fractions = 'frac',
    Ordinals = 'ordn',
    // StylisticSets = 'ss##',
    ProportionalWidths = 'pwid',
    ProportionalAlternateWidths = 'palt',
    ProportionalKana = 'pkna',
    FullWidths = 'fwid',
    HalfWidths = 'hwid',
    AlternateHalfWidths = 'halt',
    ThirdWidths = 'twid',
    QuarterWidths = 'qwid',
    JIS78Forms = 'jp78',
    JIS83Forms = 'jp83',
    JIS90Forms = 'jp90',
    JIS2004Forms = 'jp04',
    TraditionalForms = 'trad',
    RubyNotationForms = 'ruby',
    HorizontalKanaAlternates = 'hkna',
    NLCKanjiForms = 'nlck',
    AlternateAnnotationForms = 'nalt',
    Italics = 'ital',
    VerticalKerning = 'vkrn',
    VerticalAlternates = 'vert',
    ProportionalAlternateVerticalMetrics = 'vpal',
    AlternateVerticalHalfMetrics = 'vhal',
    VerticalKanaAlternates = 'vkna',
    Kerning = 'kern',
    GlyphComposition = 'ccmp',
    LocalizedForms = 'locl',
    Superscript = 'sups',
    Subscript = 'subs',
}