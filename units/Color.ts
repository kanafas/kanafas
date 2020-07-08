import { Numbers } from "../utils/Numbers.js";


export class Color {
    private _red: number = 0;
    private _green: number = 0;
    private _blue: number = 0;
    private _alpha: number = 1;

    set red(v: number) {
        this._red = Numbers.limit(v, 0, 255);
    }
    set green(v: number) {
        this._green = Numbers.limit(v, 0, 255);
    }
    set blue(v: number) {
        this._blue = Numbers.limit(v, 0, 255);
    }
    set alpha(v: number) {
        this._alpha = Numbers.limit(v, 0, 1);
    }

    get red(): number { return this._red; }
    get green(): number { return this._green; }
    get blue(): number { return this._blue; }
    get alpha(): number { return this._alpha; }


    constructor(r: number = 0, g: number = 0, b: number = 0, alpha: number = 1) {
        this.red = r;
        this.green = g;
        this.blue = b;
        this.alpha = alpha;
    }


    getRGBA(): IColorRGBA {
        return {
            red: this.red,
            green: this.green,
            blue: this.blue,
            alpha: this.alpha
        } as IColorRGBA;
    }


    getRGB(): IColorRGB {
        return {
            red: this.red,
            green: this.green,
            blue: this.blue,
        } as IColorRGB;
    }


    getHSLA(): IColorHSLA {
        return Color.convertRGBAtoHSLA(this.red, this.green, this.blue, this.alpha);
    }


    getHSL(): IColorHSL {
        return Color.convertRGBtoHSL(this.red, this.green, this.blue);
    }


    getHex(): string {
        const red = Math.round(this.red).toString(16);
        const green = Math.round(this.green).toString(16);
        const blue = Math.round(this.blue).toString(16);
        const alpha = Math.round(this.alpha * 255).toString(16);

        const builder: string[] = ['#',
            red.length == 2 ? red : '0' + red,
            green.length == 2 ? green : '0' + green,
            blue.length == 2 ? blue : '0' + blue,
        ];

        if (this.alpha < 1) {
            builder.push(alpha.length == 2 ? alpha : '0' + alpha,);
        }

        return builder.join('');
    }


    getCSSValue(): string {
        if (this.alpha < 1) {
            return `rgba(${this.red.toFixed(3)}, ${this.green.toFixed(3)}, ${this.blue.toFixed(3)}, ${this.alpha.toFixed(3)})`;
        } else {
            return this.getHex();
        }
    }


    getStyle(): string {
        return `rgba(${this.red.toFixed(3)}, ${this.green.toFixed(3)}, ${this.blue.toFixed(3)}, ${this.alpha.toFixed(3)})`;
    }


    /**
     * Returns cloned Color object
     * @returns {Color} Color
     */
    clone(): Color {
        return new Color(this.red, this.green, this.blue, this.alpha);
    }


    /**
     * Create new Color object ❤️
     * @returns {Color} new Color
     */
    static red(alpha: number = 1): Color {
        return new Color(255, 0, 0, alpha);
    }


    /**
     * Create new Color object 🟨
     * @returns {Color} new Color
     */
    static yellow(alpha: number = 1): Color {
        return new Color(255, 255, 0, alpha);
    }


    /**
     * Create new Color object 🟩
     * @returns {Color} new Color
     */
    static green(alpha: number = 1): Color {
        return new Color(0, 255, 0, alpha);
    }


    /**
     * Create new Color object 🟦
     * @returns {Color} new Color
     */
    static blue(alpha: number = 1): Color {
        return new Color(0, 0, 255, alpha);
    }


    /**
     * Create new Color object 🟪
     * @returns {Color} new Color
     */
    static magenta(alpha: number = 1): Color {
        return new Color(255, 0, 255, alpha);
    }


    /**
     * Create new Color object ⬛️
     * @returns {Color} new Color
     */
    static black(alpha: number = 1): Color {
        return new Color(0, 0, 0, alpha);
    }


    /**
     * Create new Color object ⬜️
     * @returns {Color} new Color
     */
    static white(alpha: number = 1): Color {
        return new Color(255, 255, 255, alpha);
    }


    /**
     * Create new Color object 🐀
     * @returns {Color} new Color
     */
    static grey(alpha: number = 1): Color {
        return new Color(127, 127, 127, alpha);
    }


    /**
     * Create new Color object 🏁
     * @returns {Color} new Color
     */
    static transparent(): Color {
        return new Color(0, 0, 0, 0);
    }


    /**
     * Create new Color object from hexdec value
     * @param {string} value #RGB|#RRGGBB|#RRGGBBAA
     * @returns {Color} new Color
     */
    static fromHex(value: string): Color {
        if (value.substr(0, 1) == '#') {
            value = value.substr(1);
        }

        let rr: string;
        let gg: string;
        let bb: string;
        let aa: string | null = null;

        if (value.length == 3) {
            rr = value.substring(0, 1) + value.substring(0, 1);
            gg = value.substring(1, 2) + value.substring(1, 2);
            bb = value.substring(2, 3) + value.substring(2, 3);

        } else if (value.length == 6) {
            rr = value.substring(0, 2);
            gg = value.substring(2, 4);
            bb = value.substring(4, 6);

        } else if (value.length == 8) {
            rr = value.substring(0, 2);
            gg = value.substring(2, 4);
            bb = value.substring(4, 6);
            aa = value.substring(6, 8);

        } else {
            throw new Error(`Color #${value} is not valid hex color value.`);
        }

        const r = parseInt(rr, 16);
        const g = parseInt(gg, 16);
        const b = parseInt(bb, 16);
        const a = aa ? parseInt(aa, 16) / 255 : 1;

        return Color.fromRGBA(r, g, b, a);
    }


    /**
     * Create new Color object from RGBA values
     * @param {number} r ❤️ Red channel <0, 255>
     * @param {number} g 💚 Green channel <0, 255>
     * @param {number} b 💙 Blue channel <0, 255>
     * @param {number} alpha 🏁 Alpha channel <0, 1>
     * @returns {Color} new Color
     */
    static fromRGBA(r: number, g: number, b: number, alpha: number): Color {
        const color = new Color(r, g, b, alpha);

        return color;
    }


    /**
     * Create new Color object from RGB values
     * @param {number} r ❤️ Red channel <0, 255>
     * @param {number} g 💚 Green channel <0, 255>
     * @param {number} b 💙 Blue channel <0, 255>
     * @returns {Color} new Color
     */
    static fromRGB(r: number, g: number, b: number): Color {
        return this.fromRGBA(r, g, b, 1);
    }


    /**
     * Create new Color object from HSLA values
     * @param {number} h 🌈 Hue channel <0, 360>
     * @param {number} s ☯️ Saturation channel <0, 100>
     * @param {number} l ☀️ Lightness channel <0, 100>
     * @param {number} alpha 🏁 Alpha channel <0, 1>
     * @returns {Color} new Color
     */
    static fromHSLA(h: number, s: number, l: number, alpha: number): Color {
        const data = Color.convertHSLAtoRGBA(h, s, l, alpha);

        const color = new Color();
        color.red = data.red;
        color.green = data.green;
        color.blue = data.blue;
        color.alpha = data.alpha;

        return color;
    }


    /**
     * Create new Color object from HSL values
     * @param {number} h 🌈 Hue channel <0, 360>
     * @param {number} s ☯️ Saturation channel <0, 100>
     * @param {number} l ☀️ Lightness channel <0, 100>
     * @returns {Color} new Color
     */
    static fromHSL(h: number, s: number, l: number): Color {
        return this.fromHSLA(h, s, l, 1);
    }



    /**
     * Conver RGBA to HSLA
     * @param {number} r ❤️ Red channel <0, 255>
     * @param {number} g 💚 Green channel <0, 255>
     * @param {number} b 🟦 Blue channel <0, 255>
     * @param {number} alpha 🏁 Alpha channel <0, 1>
     * @returns IColorHSLA
     */
    static convertRGBAtoHSLA = (r: number, g: number, b: number, alpha: number): IColorHSLA => {
        r /= 255;
        g /= 255;
        b /= 255;

        let cmin: number = Math.min(r, g, b),
            cmax: number = Math.max(r, g, b),
            delta: number = cmax - cmin,
            h: number = 0,
            s: number = 0,
            l: number = 0;

        if (delta == 0) h = 0;
        else if (cmax == r) h = ((g - b) / delta) % 6;
        else if (cmax == g) h = (b - r) / delta + 2;
        else h = (r - g) / delta + 4;

        h = Math.round(h * 60);

        if (h < 0) h += 360;

        l = (cmax + cmin) / 2;
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        s *= 100;
        l *= 100;

        return { hue: h, saturation: s, lightness: l, alpha }
    }


    /**
     * Conver RGB to HSL
     * @param {number} r ❤️ Red channel <0, 255>
     * @param {number} g 💚 Green channel <0, 255>
     * @param {number} b 🟦 Blue channel <0, 255>
     * @returns IColorHSL
     */
    static convertRGBtoHSL = (r: number, g: number, b: number): IColorHSL => {
        const c = Color.convertRGBAtoHSLA(r, g, b, 1);
        return {
            hue: c.hue,
            saturation: c.saturation,
            lightness: c.lightness,
        }
    }


    /**
     * Convert HSLA to RGBA
     * @param {number} r ❤️ Red channel <0, 255>
     * @param {number} g 💚 Green channel <0, 255>
     * @param {number} b 🟦 Blue channel <0, 255>
     * @param {number} alpha 🏁 Alpha channel <0, 1>
     * @returns IColorRGBA
     */
    static convertHSLAtoRGBA = (h: number, s: number, l: number, alpha: number): IColorRGBA => {
        s /= 100;
        l /= 100;

        let c: number = (1 - Math.abs(2 * l - 1)) * s,
            x: number = c * (1 - Math.abs((h / 60) % 2 - 1)),
            m: number = l - c / 2,
            r: number = 0,
            g: number = 0,
            b: number = 0;

        if (0 <= h && h < 60) {
            r = c;
            g = x;
            b = 0;

        } else if (60 <= h && h < 120) {
            r = x;
            g = c;
            b = 0;

        } else if (120 <= h && h < 180) {
            r = 0;
            g = c;
            b = x;

        } else if (180 <= h && h < 240) {
            r = 0;
            g = x;
            b = c;

        } else if (240 <= h && h < 300) {
            r = x;
            g = 0;
            b = c;

        } else if (300 <= h && h < 360) {
            r = c;
            g = 0;
            b = x;

        }

        r = (r + m) * 255;
        g = (g + m) * 255;
        b = (b + m) * 255;

        return { red: r, green: g, blue: b, alpha }
    }


    /**
     * Convert HSL to RGB
     * @param {number} r ❤️ Red channel <0, 255>
     * @param {number} g 💚 Green channel <0, 255>
     * @param {number} b 🟦 Blue channel <0, 255>
     * @returns IColorRGB
     */
    static convertHSLtoRGB = (h: number, s: number, l: number): IColorRGB => {
        const c = Color.convertHSLAtoRGBA(h, s, l, 1);

        return {
            red: c.red,
            green: c.green,
            blue: c.blue,
        }
    }
}


export interface IColorRGB {
    red: number,
    green: number,
    blue: number,
}


export interface IColorRGBA extends IColorRGB {
    alpha: number,
}


export interface IColorHSL {
    hue: number,
    saturation: number,
    lightness: number,
}


export interface IColorHSLA extends IColorHSL {
    alpha: number,
}