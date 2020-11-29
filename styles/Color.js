import { Numbers } from "../utils/Numbers.js";
export class Color {
    constructor(r = 0, g = 0, b = 0, alpha = 1) {
        this._red = 0;
        this._green = 0;
        this._blue = 0;
        this._alpha = 1;
        this.red = r;
        this.green = g;
        this.blue = b;
        this.alpha = alpha;
    }
    get red() { return this._red; }
    set red(v) {
        this._red = Numbers.limit(v, 0, 255);
    }
    get green() { return this._green; }
    set green(v) {
        this._green = Numbers.limit(v, 0, 255);
    }
    get blue() { return this._blue; }
    set blue(v) {
        this._blue = Numbers.limit(v, 0, 255);
    }
    get alpha() { return this._alpha; }
    set alpha(v) {
        this._alpha = Numbers.limit(v, 0, 1);
    }
    getRGBA() {
        return {
            red: this.red,
            green: this.green,
            blue: this.blue,
            alpha: this.alpha
        };
    }
    getRGB() {
        return {
            red: this.red,
            green: this.green,
            blue: this.blue,
        };
    }
    getHSLA() {
        return Color.convertRGBAtoHSLA(this.red, this.green, this.blue, this.alpha);
    }
    getHSL() {
        return Color.convertRGBtoHSL(this.red, this.green, this.blue);
    }
    getHue() {
        const c = this.getHSL();
        return c.hue;
    }
    getSaturation() {
        const c = this.getHSL();
        return c.saturation;
    }
    getLightness() {
        const c = this.getHSL();
        return c.lightness;
    }
    setRGBA(...values) {
        const entry = Color._parseEntryType_ColorRGBA(values);
        this.red = entry.red;
        this.green = entry.green;
        this.blue = entry.blue;
        this.alpha = entry.alpha;
        return this;
    }
    setRGB(...values) {
        const entry = Color._parseEntryType_ColorRGB(values);
        this.red = entry.red;
        this.green = entry.green;
        this.blue = entry.blue;
        return this;
    }
    setHSLA(...values) {
        const entry = Color._parseEntryType_ColorHSLA(values);
        const data = Color.convertHSLAtoRGBA(entry.hue, entry.saturation, entry.lightness, entry.alpha);
        this.red = data.red;
        this.green = data.green;
        this.blue = data.blue;
        this.alpha = data.alpha;
        return this;
    }
    setHSL(...values) {
        const entry = Color._parseEntryType_ColorHSL(values);
        const data = Color.convertHSLtoRGB(entry.hue, entry.saturation, entry.lightness);
        this.red = data.red;
        this.green = data.green;
        this.blue = data.blue;
        return this;
    }
    setHue(hue) {
        const c = this.getHSLA();
        this.setHSLA(hue, c.saturation, c.lightness, c.alpha);
    }
    setSaturation(saturation) {
        const c = this.getHSLA();
        this.setHSLA(c.hue, saturation, c.lightness, c.alpha);
    }
    setLightness(lightness) {
        const c = this.getHSLA();
        this.setHSLA(c.hue, c.saturation, lightness, c.alpha);
    }
    getHex() {
        return Color.convertRGBAtoHex(this.red, this.green, this.blue, this.alpha);
    }
    getCSSValue() {
        if (this.alpha < 1) {
            return `rgba(${this.red.toFixed(3)}, ${this.green.toFixed(3)}, ${this.blue.toFixed(3)}, ${this.alpha.toFixed(3)})`;
        }
        else {
            return this.getHex();
        }
    }
    getStyle() {
        return Color.convertRGBAtoStyle(this);
    }
    /**
     * Returns cloned Color object
     * @returns {Color} Color
     */
    clone() {
        return new Color(this.red, this.green, this.blue, this.alpha);
    }
    /**
     * Create new Color object ❤️
     * @returns {Color} new Color
     */
    static get red() {
        return new Color(255, 0, 0);
    }
    /**
     * Create new Color object 🟨
     * @returns {Color} new Color
     */
    static get yellow() {
        return new Color(255, 255, 0);
    }
    /**
     * Create new Color object 🟩
     * @returns {Color} new Color
     */
    static get green() {
        return new Color(0, 255, 0);
    }
    /**
     * Create new Color object 🟦
     * @returns {Color} new Color
     */
    static get blue() {
        return new Color(0, 0, 255);
    }
    /**
     * Create new Color object 🟪
     * @returns {Color} new Color
     */
    static get magenta() {
        return new Color(255, 0, 255);
    }
    /**
     * Create new Color object ⬛️
     * @returns {Color} new Color
     */
    static get black() {
        return new Color(0, 0, 0);
    }
    /**
     * Create new Color object ⬜️
     * @returns {Color} new Color
     */
    static get white() {
        return new Color(255, 255, 255);
    }
    /**
     * Create new Color object 🐀
     * @returns {Color} new Color
     */
    static get grey() {
        return new Color(127, 127, 127);
    }
    /**
     * Create new Color object 🏁
     * @returns {Color} new Color
     */
    static get transparent() {
        return new Color(0, 0, 0, 0);
    }
    /**
     * Create new Color object from hexdec value
     * @param {string} value #RGB|#RRGGBB|#RRGGBBAA
     * @returns {Color} new Color
     */
    static fromHex(value) {
        value = value.trim();
        if (value.substr(0, 1) == '#') {
            value = value.substr(1);
        }
        let rr;
        let gg;
        let bb;
        let aa = null;
        if (value.length == 3) {
            rr = value.substring(0, 1) + value.substring(0, 1);
            gg = value.substring(1, 2) + value.substring(1, 2);
            bb = value.substring(2, 3) + value.substring(2, 3);
        }
        else if (value.length == 4) {
            rr = value.substring(0, 1) + value.substring(0, 1);
            gg = value.substring(1, 2) + value.substring(1, 2);
            bb = value.substring(2, 3) + value.substring(2, 3);
            aa = value.substring(3, 4) + value.substring(3, 4);
        }
        else if (value.length == 6) {
            rr = value.substring(0, 2);
            gg = value.substring(2, 4);
            bb = value.substring(4, 6);
        }
        else if (value.length == 8) {
            rr = value.substring(0, 2);
            gg = value.substring(2, 4);
            bb = value.substring(4, 6);
            aa = value.substring(6, 8);
        }
        else {
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
    static fromRGBA(...values) {
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
    static fromRGB(...values) {
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
    static fromHSLA(...values) {
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
    static fromHSL(...values) {
        const entry = Color._parseEntryType_ColorHSL(values);
        const color = this.fromHSLA(entry.hue, entry.saturation, entry.lightness, 1);
        return color;
    }
    static _parseEntryType_ColorRGBA(values) {
        if (values.length == 4) {
            return {
                red: values[0],
                green: values[1],
                blue: values[2],
                alpha: values[3],
            };
        }
        else {
            return values[0];
        }
    }
    static _parseEntryType_ColorRGB(values) {
        if (values.length == 3) {
            return {
                red: values[0],
                green: values[1],
                blue: values[2],
            };
        }
        else {
            return values[0];
        }
    }
    static _parseEntryType_ColorHSLA(values) {
        if (values.length == 4) {
            return {
                hue: values[0],
                saturation: values[1],
                lightness: values[2],
                alpha: values[3],
            };
        }
        else {
            return values[0];
        }
    }
    static _parseEntryType_ColorHSL(values) {
        if (values.length == 3) {
            return {
                hue: values[0],
                saturation: values[1],
                lightness: values[2],
            };
        }
        else {
            return values[0];
        }
    }
}
/**
 * Conver RGBA to HSLA
 * @param {number} r ❤️ Red channel <0, 255>
 * @param {number} g 💚 Green channel <0, 255>
 * @param {number} b 🟦 Blue channel <0, 255>
 * @param {number} alpha 🏁 Alpha channel <0, 1>
 * @returns IColorHSLA
 */
Color.convertRGBAtoHSLA = (...values) => {
    const entry = Color._parseEntryType_ColorRGBA(values);
    let r = Numbers.limit(entry.red, 0, 255);
    let g = Numbers.limit(entry.green, 0, 255);
    let b = Numbers.limit(entry.blue, 0, 255);
    let alpha = Numbers.limit(entry.alpha, 0, 1);
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin, h = 0, s = 0, l = 0;
    if (delta == 0)
        h = 0;
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    else if (cmax == g)
        h = (b - r) / delta + 2;
    else
        h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0)
        h += 360;
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s *= 100;
    l *= 100;
    return { hue: h, saturation: s, lightness: l, alpha };
};
/**
 * Conver RGB to HSL
 * @param {number} r ❤️ Red channel <0, 255>
 * @param {number} g 💚 Green channel <0, 255>
 * @param {number} b 🟦 Blue channel <0, 255>
 * @returns IColorHSL
 */
// static convertRGBtoHSL = (r: number, g: number, b: number): IColorHSL => {
Color.convertRGBtoHSL = (...values) => {
    const entry = Color._parseEntryType_ColorRGB(values);
    const c = Color.convertRGBAtoHSLA(entry.red, entry.green, entry.blue, 1);
    return {
        hue: c.hue,
        saturation: c.saturation,
        lightness: c.lightness,
    };
};
/**
 * Convert HSLA to RGBA
 * @param {number} h 🌈 Hue channel <0, 360)
 * @param {number} s ☯️ Saturation channel <0, 100>
 * @param {number} l ☀️ Lightness channel <0, 100>
 * @param {number} alpha 🏁 Alpha channel <0, 1>
 * @returns IColorRGBA
 */
Color.convertHSLAtoRGBA = (...values) => {
    const entry = Color._parseEntryType_ColorHSLA(values);
    let h = entry.hue;
    let s = entry.saturation;
    let l = entry.lightness;
    let alpha = entry.alpha;
    if (h > 0)
        while (h >= 360)
            h -= 360;
    else if (h < 0)
        while (h < 0)
            h += 360;
    s = Numbers.limit(s, 0, 100);
    l = Numbers.limit(l, 0, 100);
    alpha = Numbers.limit(alpha, 0, 1);
    s /= 100;
    l /= 100;
    let c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = l - c / 2, r = 0, g = 0, b = 0;
    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    }
    else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    }
    else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    }
    else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    }
    else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    }
    else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    r = (r + m) * 255;
    g = (g + m) * 255;
    b = (b + m) * 255;
    return { red: r, green: g, blue: b, alpha };
};
/**
 * Convert HSL to RGB
 * @param {number} r ❤️ Red channel <0, 255>
 * @param {number} g 💚 Green channel <0, 255>
 * @param {number} b 🟦 Blue channel <0, 255>
 * @returns IColorRGB
 */
Color.convertHSLtoRGB = (...values) => {
    const entry = Color._parseEntryType_ColorHSL(values);
    const c = Color.convertHSLAtoRGBA(entry.hue, entry.saturation, entry.lightness, 1);
    return {
        red: c.red,
        green: c.green,
        blue: c.blue,
    };
};
/**
 * Convert RGBA to Hex
 * @param {number} r ❤️ Red channel <0, 255>
 * @param {number} g 💚 Green channel <0, 255>
 * @param {number} b 🟦 Blue channel <0, 255>
 * @param {number} alpha 🏁 Alpha channel <0, 1>
 * @returns string
 */
Color.convertRGBAtoHex = (...values) => {
    const entry = Color._parseEntryType_ColorRGBA(values);
    const red = Math.round(entry.red).toString(16);
    const green = Math.round(entry.green).toString(16);
    const blue = Math.round(entry.blue).toString(16);
    const alpha = Math.round(entry.alpha * 255).toString(16);
    const builder = ['#',
        red.length == 2 ? red : '0' + red,
        green.length == 2 ? green : '0' + green,
        blue.length == 2 ? blue : '0' + blue,
    ];
    if (entry.alpha < 1) {
        builder.push(alpha.length == 2 ? alpha : '0' + alpha);
    }
    return builder.join('');
};
/**
 * Convert RGB to Hex
 * @param {number} r ❤️ Red channel <0, 255>
 * @param {number} g 💚 Green channel <0, 255>
 * @param {number} b 🟦 Blue channel <0, 255>
 * @returns string
 */
Color.convertRGBtoHex = (...values) => {
    const entry = Color._parseEntryType_ColorRGB(values);
    return Color.convertRGBAtoHex(entry.red, entry.green, entry.blue, 1);
};
/**
 * Convert HSLA to Hex
 * @param {number} h 🌈 Hue channel <0, 360)
 * @param {number} s ☯️ Saturation channel <0, 100>
 * @param {number} l ☀️ Lightness channel <0, 100>
 * @param {number} alpha 🏁 Alpha channel <0, 1>
 * @returns string
 */
Color.convertHSLAtoHex = (...values) => {
    const entry = Color._parseEntryType_ColorHSLA(values);
    const data = Color.convertHSLAtoRGBA(entry.hue, entry.saturation, entry.lightness, entry.alpha);
    return Color.convertRGBAtoHex(data.red, data.green, data.blue, data.alpha);
};
/**
 * Convert HSL to Hex
 * @param {number} r ❤️ Red channel <0, 255>
 * @param {number} g 💚 Green channel <0, 255>
 * @param {number} b 🟦 Blue channel <0, 255>
 * @returns string
 */
Color.convertHSLtoHex = (...values) => {
    const entry = Color._parseEntryType_ColorHSL(values);
    const data = Color.convertHSLtoRGB(entry.hue, entry.saturation, entry.lightness);
    return Color.convertRGBtoHex(data.red, data.green, data.blue);
};
Color.convertRGBAtoStyle = (...values) => {
    const entry = Color._parseEntryType_ColorRGBA(values);
    return `rgba(${entry.red.toFixed(3)}, ${entry.green.toFixed(3)}, ${entry.blue.toFixed(3)}, ${entry.alpha.toFixed(3)})`;
};
