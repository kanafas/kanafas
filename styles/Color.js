import { Color as UnitColor } from "../units/Color.js";
export class Color extends UnitColor {
    getStyle() {
        return `rgba(${this.red.toFixed(3)}, ${this.green.toFixed(3)}, ${this.blue.toFixed(3)}, ${this.alpha.toFixed(3)})`;
    }
}
