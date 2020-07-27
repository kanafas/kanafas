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
    set red(v) {
        this._red = Numbers.limit(v, 0, 255);
    }
    set green(v) {
        this._green = Numbers.limit(v, 0, 255);
    }
    set blue(v) {
        this._blue = Numbers.limit(v, 0, 255);
    }
    set alpha(v) {
        this._alpha = Numbers.limit(v, 0, 1);
    }
    get red() { return this._red; }
    get green() { return this._green; }
    get blue() { return this._blue; }
    get alpha() { return this._alpha; }
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
    setHSLA(hue, saturation, lightness, alpha) {
        const rgba = Color.convertHSLAtoRGBA(hue, saturation, lightness, alpha);
        this.red = rgba.red;
        this.green = rgba.green;
        this.blue = rgba.blue;
        this.alpha = rgba.alpha;
        return this;
    }
    setHSL(hue, saturation, lightness) {
        this.setHSLA(hue, saturation, lightness, this.alpha);
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
        const red = Math.round(this.red).toString(16);
        const green = Math.round(this.green).toString(16);
        const blue = Math.round(this.blue).toString(16);
        const alpha = Math.round(this.alpha * 255).toString(16);
        const builder = ['#',
            red.length == 2 ? red : '0' + red,
            green.length == 2 ? green : '0' + green,
            blue.length == 2 ? blue : '0' + blue,
        ];
        if (this.alpha < 1) {
            builder.push(alpha.length == 2 ? alpha : '0' + alpha);
        }
        return builder.join('');
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
        return `rgba(${this.red.toFixed(3)}, ${this.green.toFixed(3)}, ${this.blue.toFixed(3)}, ${this.alpha.toFixed(3)})`;
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
    static red(alpha = 1) {
        return new Color(255, 0, 0, alpha);
    }
    /**
     * Create new Color object 🟨
     * @returns {Color} new Color
     */
    static yellow(alpha = 1) {
        return new Color(255, 255, 0, alpha);
    }
    /**
     * Create new Color object 🟩
     * @returns {Color} new Color
     */
    static green(alpha = 1) {
        return new Color(0, 255, 0, alpha);
    }
    /**
     * Create new Color object 🟦
     * @returns {Color} new Color
     */
    static blue(alpha = 1) {
        return new Color(0, 0, 255, alpha);
    }
    /**
     * Create new Color object 🟪
     * @returns {Color} new Color
     */
    static magenta(alpha = 1) {
        return new Color(255, 0, 255, alpha);
    }
    /**
     * Create new Color object ⬛️
     * @returns {Color} new Color
     */
    static black(alpha = 1) {
        return new Color(0, 0, 0, alpha);
    }
    /**
     * Create new Color object ⬜️
     * @returns {Color} new Color
     */
    static white(alpha = 1) {
        return new Color(255, 255, 255, alpha);
    }
    /**
     * Create new Color object 🐀
     * @returns {Color} new Color
     */
    static grey(alpha = 1) {
        return new Color(127, 127, 127, alpha);
    }
    /**
     * Create new Color object 🏁
     * @returns {Color} new Color
     */
    static transparent() {
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
    static fromRGBA(r, g, b, alpha) {
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
    static fromRGB(r, g, b) {
        return this.fromRGBA(r, g, b, 1);
    }
    /**
     * Create new Color object from HSLA values
     * @param {number} h 🌈 Hue channel <0, 360)
     * @param {number} s ☯️ Saturation channel <0, 100>
     * @param {number} l ☀️ Lightness channel <0, 100>
     * @param {number} alpha 🏁 Alpha channel <0, 1>
     * @returns {Color} new Color
     */
    static fromHSLA(h, s, l, alpha) {
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
     * @param {number} h 🌈 Hue channel <0, 360)
     * @param {number} s ☯️ Saturation channel <0, 100>
     * @param {number} l ☀️ Lightness channel <0, 100>
     * @returns {Color} new Color
     */
    static fromHSL(h, s, l) {
        return this.fromHSLA(h, s, l, 1);
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
Color.convertRGBAtoHSLA = (r, g, b, alpha) => {
    r = Numbers.limit(r, 0, 255);
    g = Numbers.limit(g, 0, 255);
    b = Numbers.limit(b, 0, 255);
    alpha = Numbers.limit(alpha, 0, 1);
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
Color.convertRGBtoHSL = (r, g, b) => {
    const c = Color.convertRGBAtoHSLA(r, g, b, 1);
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
Color.convertHSLAtoRGBA = (h, s, l, alpha) => {
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
Color.convertHSLtoRGB = (h, s, l) => {
    const c = Color.convertHSLAtoRGBA(h, s, l, 1);
    return {
        red: c.red,
        green: c.green,
        blue: c.blue,
    };
};
