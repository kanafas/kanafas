import { IClonable } from "../core/IClonable.js";
import { Numbers } from "../utils/Numbers.js";
import { IStyle } from "./Style.js";


export class Color implements IClonable<Color>, IStyle {

    private _red: number = 0;
    get red(): number { return this._red; }
    set red(v: number) {
        this._red = Numbers.limit(v, 0, 255);
    }

    private _green: number = 0;
    get green(): number { return this._green; }
    set green(v: number) {
        this._green = Numbers.limit(v, 0, 255);
    }

    private _blue: number = 0;
    get blue(): number { return this._blue; }
    set blue(v: number) {
        this._blue = Numbers.limit(v, 0, 255);
    }

    private _alpha: number = 1;
    get alpha(): number { return this._alpha; }
    set alpha(v: number) {
        this._alpha = Numbers.limit(v, 0, 1);
    }


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


    getHue(): number {
        const c = this.getHSL();
        return c.hue;
    }


    getSaturation(): number {
        const c = this.getHSL();
        return c.saturation;
    }


    getLightness(): number {
        const c = this.getHSL();
        return c.lightness;
    }


    setRGBA(...values: EntryType_ColorRGBA): Color {
        const entry = Color._parseEntryType_ColorRGBA(values);

        this.red = entry.red;
        this.green = entry.green;
        this.blue = entry.blue;
        this.alpha = entry.alpha;

        return this;
    }


    setRGB(...values: EntryType_ColorRGB): Color {
        const entry = Color._parseEntryType_ColorRGB(values);

        this.red = entry.red;
        this.green = entry.green;
        this.blue = entry.blue;

        return this;
    }


    setHSLA(...values: EntryType_ColorHSLA): Color {
        const entry = Color._parseEntryType_ColorHSLA(values);
        const data = Color.convertHSLAtoRGBA(entry.hue, entry.saturation, entry.lightness, entry.alpha);

        this.red = data.red;
        this.green = data.green;
        this.blue = data.blue;
        this.alpha = data.alpha;

        return this;
    }


    setHSL(...values: EntryType_ColorHSL): Color {
        const entry = Color._parseEntryType_ColorHSL(values);
        const data = Color.convertHSLtoRGB(entry.hue, entry.saturation, entry.lightness);

        this.red = data.red;
        this.green = data.green;
        this.blue = data.blue;

        return this;
    }


    setHue(hue: number): void {
        const c = this.getHSLA();
        this.setHSLA(hue, c.saturation, c.lightness, c.alpha);
    }


    setSaturation(saturation: number): void {
        const c = this.getHSLA();
        this.setHSLA(c.hue, saturation, c.lightness, c.alpha);
    }


    setLightness(lightness: number): void {
        const c = this.getHSLA();
        this.setHSLA(c.hue, c.saturation, lightness, c.alpha);
    }


    getHex(): string {
        return Color.convertRGBAtoHex(this.red, this.green, this.blue, this.alpha);
    }


    getCSSValue(): string {
        if (this.alpha < 1) {
            return `rgba(${this.red.toFixed(3)}, ${this.green.toFixed(3)}, ${this.blue.toFixed(3)}, ${this.alpha.toFixed(3)})`;
        } else {
            return this.getHex();
        }
    }


    getStyle(): string {
        return Color.convertRGBAtoStyle(this);
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
    static get Red(): Color {
        return new Color(255, 0, 0);
    }


    /**
     * Create new Color object 🟨
     * @returns {Color} new Color
     */
    static get Yellow(): Color {
        return new Color(255, 255, 0);
    }


    /**
     * Create new Color object 🟩
     * @returns {Color} new Color
     */
    static get Green(): Color {
        return new Color(0, 255, 0);
    }


    /**
     * Create new Color object 🟦
     * @returns {Color} new Color
     */
    static get Blue(): Color {
        return new Color(0, 0, 255);
    }


    /**
     * Create new Color object 🟪
     * @returns {Color} new Color
     */
    static get Magenta(): Color {
        return new Color(255, 0, 255);
    }


    /**
     * Create new Color object ⬛️
     * @returns {Color} new Color
     */
    static get Black(): Color {
        return new Color(0, 0, 0);
    }


    /**
     * Create new Color object ⬜️
     * @returns {Color} new Color
     */
    static get White(): Color {
        return new Color(255, 255, 255);
    }


    /**
     * Create new Color object 🐀
     * @returns {Color} new Color
     */
    static get Grey(): Color {
        return new Color(127, 127, 127);
    }


    /**
     * Create new Color object 🏁
     * @returns {Color} new Color
     */
    static get Transparent(): Color {
        return new Color(0, 0, 0, 0);
    }


    /**
     * Create new Color object from hexdec value
     * @param {string} value #RGB|#RRGGBB|#RRGGBBAA
     * @returns {Color} new Color
     */
    static fromHex(value: string): Color {
        value = value.trim();

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

        } else if (value.length == 4) {
            rr = value.substring(0, 1) + value.substring(0, 1);
            gg = value.substring(1, 2) + value.substring(1, 2);
            bb = value.substring(2, 3) + value.substring(2, 3);
            aa = value.substring(3, 4) + value.substring(3, 4);

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
    static fromRGBA(...values: EntryType_ColorRGBA): Color {
        const entry = Color._parseEntryType_ColorRGBA(values);
        const color = new Color(entry.red, entry.green, entry.blue, entry.alpha);

        return color;
    }


    /**
     * Create new Color object from RGB values
     * @param {number} r ❤️ Red channel <0, 255>
     * @param {number} g 💚 Green channel <0, 255>
     * @param {number} b 💙 Blue channel <0, 255>
     * @returns {Color} new Color
     */
    static fromRGB(...values: EntryType_ColorRGB): Color {
        const entry = Color._parseEntryType_ColorRGB(values);
        const color = this.fromRGBA(entry.red, entry.green, entry.blue, 1);

        return color;
    }


    /**
     * Create new Color object from HSLA values
     * @param {number} h 🌈 Hue channel <0, 360)
     * @param {number} s ☯️ Saturation channel <0, 100>
     * @param {number} l ☀️ Lightness channel <0, 100>
     * @param {number} alpha 🏁 Alpha channel <0, 1>
     * @returns {Color} new Color
     */
    static fromHSLA(...values: EntryType_ColorHSLA): Color {
        const entry = Color._parseEntryType_ColorHSLA(values);
        const data = Color.convertHSLAtoRGBA(entry.hue, entry.saturation, entry.lightness, entry.alpha);

        const color = new Color();
        color.red = data.red;
        color.green = data.green;
        color.blue = data.blue;
        color.alpha = data.alpha;

        return color;
    }


    /**
     * Create new Color object from HSL values
     * @param {number} h 🌈 Hue channel <0, 360)
     * @param {number} s ☯️ Saturation channel <0, 100>
     * @param {number} l ☀️ Lightness channel <0, 100>
     * @returns {Color} new Color
     */
    static fromHSL(...values: EntryType_ColorHSL): Color {
        const entry = Color._parseEntryType_ColorHSL(values);
        const color = this.fromHSLA(entry.hue, entry.saturation, entry.lightness, 1);

        return color;
    }


    /**
     * Conver RGBA to HSLA
     * @param {number} r ❤️ Red channel <0, 255>
     * @param {number} g 💚 Green channel <0, 255>
     * @param {number} b 🟦 Blue channel <0, 255>
     * @param {number} alpha 🏁 Alpha channel <0, 1>
     * @returns IColorHSLA
     */
    static convertRGBAtoHSLA = (...values: EntryType_ColorRGBA): IColorHSLA => {
        const entry = Color._parseEntryType_ColorRGBA(values);
        
        let r = Numbers.limit(entry.red, 0, 255);
        let g = Numbers.limit(entry.green, 0, 255);
        let b = Numbers.limit(entry.blue, 0, 255);
        let alpha = Numbers.limit(entry.alpha, 0, 1);

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
    // static convertRGBtoHSL = (r: number, g: number, b: number): IColorHSL => {
    static convertRGBtoHSL = (...values: EntryType_ColorRGB): IColorHSL => {
        const entry = Color._parseEntryType_ColorRGB(values);
        const c = Color.convertRGBAtoHSLA(entry.red, entry.green, entry.blue, 1);

        return {
            hue: c.hue,
            saturation: c.saturation,
            lightness: c.lightness,
        }
    }


    /**
     * Convert HSLA to RGBA
     * @param {number} h 🌈 Hue channel <0, 360)
     * @param {number} s ☯️ Saturation channel <0, 100>
     * @param {number} l ☀️ Lightness channel <0, 100>
     * @param {number} alpha 🏁 Alpha channel <0, 1>
     * @returns IColorRGBA
     */
    static convertHSLAtoRGBA = (...values: EntryType_ColorHSLA): IColorRGBA => {
        const entry = Color._parseEntryType_ColorHSLA(values);

        let h = entry.hue;
        let s = entry.saturation;
        let l = entry.lightness;
        let alpha = entry.alpha;

        if (h > 0) while (h >= 360) h -= 360;
        else if (h < 0) while (h < 0) h += 360;

        s = Numbers.limit(s, 0, 100);
        l = Numbers.limit(l, 0, 100);
        alpha = Numbers.limit(alpha, 0, 1);

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
    static convertHSLtoRGB = (...values: EntryType_ColorHSL): IColorRGB => {
        const entry = Color._parseEntryType_ColorHSL(values);
        const c = Color.convertHSLAtoRGBA(entry.hue, entry.saturation, entry.lightness, 1);

        return {
            red: c.red,
            green: c.green,
            blue: c.blue,
        }
    }


    /**
     * Convert RGBA to Hex
     * @param {number} r ❤️ Red channel <0, 255>
     * @param {number} g 💚 Green channel <0, 255>
     * @param {number} b 🟦 Blue channel <0, 255>
     * @param {number} alpha 🏁 Alpha channel <0, 1>
     * @returns string
     */
    static convertRGBAtoHex = (...values: EntryType_ColorRGBA): string => {
        const entry = Color._parseEntryType_ColorRGBA(values);

        const red = Math.round(entry.red).toString(16);
        const green = Math.round(entry.green).toString(16);
        const blue = Math.round(entry.blue).toString(16);
        const alpha = Math.round(entry.alpha * 255).toString(16);

        const builder: string[] = ['#',
            red.length == 2 ? red : '0' + red,
            green.length == 2 ? green : '0' + green,
            blue.length == 2 ? blue : '0' + blue,
        ];

        if (entry.alpha < 1) {
            builder.push(alpha.length == 2 ? alpha : '0' + alpha);
        }

        return builder.join('');
    }


    /**
     * Convert RGB to Hex
     * @param {number} r ❤️ Red channel <0, 255>
     * @param {number} g 💚 Green channel <0, 255>
     * @param {number} b 🟦 Blue channel <0, 255>
     * @returns string
     */
    static convertRGBtoHex = (...values: EntryType_ColorRGB): string => {
        const entry = Color._parseEntryType_ColorRGB(values);

        return Color.convertRGBAtoHex(entry.red, entry.green, entry.blue, 1);
    }


    /**
     * Convert HSLA to Hex
     * @param {number} h 🌈 Hue channel <0, 360)
     * @param {number} s ☯️ Saturation channel <0, 100>
     * @param {number} l ☀️ Lightness channel <0, 100>
     * @param {number} alpha 🏁 Alpha channel <0, 1>
     * @returns string
     */
    static convertHSLAtoHex = (...values: EntryType_ColorHSLA): string => {
        const entry = Color._parseEntryType_ColorHSLA(values);
        const data = Color.convertHSLAtoRGBA(entry.hue, entry.saturation, entry.lightness, entry.alpha);

        return Color.convertRGBAtoHex(data.red, data.green, data.blue, data.alpha);
    }


    /**
     * Convert HSL to Hex
     * @param {number} r ❤️ Red channel <0, 255>
     * @param {number} g 💚 Green channel <0, 255>
     * @param {number} b 🟦 Blue channel <0, 255>
     * @returns string
     */
    static convertHSLtoHex = (...values: EntryType_ColorHSL): string => {
        const entry = Color._parseEntryType_ColorHSL(values);
        const data = Color.convertHSLtoRGB(entry.hue, entry.saturation, entry.lightness);

        return Color.convertRGBtoHex(data.red, data.green, data.blue);
    }


    static convertRGBAtoStyle = (...values: EntryType_ColorRGBA): string => {
        const entry = Color._parseEntryType_ColorRGBA(values);

        return `rgba(${entry.red.toFixed(3)}, ${entry.green.toFixed(3)}, ${entry.blue.toFixed(3)}, ${entry.alpha.toFixed(3)})`;
    }


    private static _parseEntryType_ColorRGBA(values: EntryType_ColorRGBA): IColorRGBA {
        if (values.length == 4) {
            return {
                red: values[0],
                green: values[1],
                blue: values[2],
                alpha: values[3],
            };
        } else {
            return values[0];
        }
    }


    private static _parseEntryType_ColorRGB(values: EntryType_ColorRGB): IColorRGB {
        if (values.length == 3) {
            return {
                red: values[0],
                green: values[1],
                blue: values[2],
            };
        } else {
            return values[0];
        }
    }


    private static _parseEntryType_ColorHSLA(values: EntryType_ColorHSLA): IColorHSLA {
        if (values.length == 4) {
            return {
                hue: values[0],
                saturation: values[1],
                lightness: values[2],
                alpha: values[3],
            };
        } else {
            return values[0];
        }
    }


    private static _parseEntryType_ColorHSL(values: EntryType_ColorHSL): IColorHSL {
        if (values.length == 3) {
            return {
                hue: values[0],
                saturation: values[1],
                lightness: values[2],
            };
        } else {
            return values[0];
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


export type EntryType_ColorRGBA =
    | [red: number, green: number, blue: number, alpha: number]
    | [color: IColorRGBA];


export type EntryType_ColorRGB =
    | [red: number, green: number, blue: number]
    | [color: IColorRGB];


export type EntryType_ColorHSLA =
    | [hue: number, saturation: number, lightness: number, alpha: number]
    | [color: IColorHSLA];


export type EntryType_ColorHSL =
    | [hue: number, saturation: number, lightness: number]
    | [color: IColorHSL];