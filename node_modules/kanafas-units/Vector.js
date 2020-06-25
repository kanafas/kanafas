import { Angle } from "./Angle.js";
export class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    get length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    add(value) {
        let x;
        let y;
        if (typeof value == 'number') {
            x = value;
            y = value;
        }
        else {
            x = value.x;
            y = value.y;
        }
        this.x += x;
        this.y += y;
        return this;
    }
    subtract(value) {
        let x;
        let y;
        if (typeof value == 'number') {
            x = value;
            y = value;
        }
        else {
            x = value.x;
            y = value.y;
        }
        this.x -= x;
        this.y -= y;
        return this;
    }
    multiple(value) {
        let x;
        let y;
        if (typeof value == 'number') {
            x = value;
            y = value;
        }
        else {
            x = value.x;
            y = value.y;
        }
        this.x *= x;
        this.y *= y;
        return this;
    }
    divide(value) {
        let x;
        let y;
        if (typeof value == 'number') {
            x = value;
            y = value;
        }
        else {
            x = value.x;
            y = value.y;
        }
        this.x /= x;
        this.y /= y;
        return this;
    }
    /**
     * Normalize the Vector to length equal 1.
     * @returns {Vector} Same Vector object.
     */
    normalize() {
        const length = this.length;
        if (length !== 0) {
            this.x = this.x / length;
            this.y = this.y / length;
        }
        return this;
    }
    /**
     * TODO: Dodělat popis
     * @returns {Vector} Same Vector object.
     */
    absolute() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        return this;
    }
    /**
     * TODO: Dodělat popis
     */
    isEquals(vector) {
        return this.x == vector.x && this.y == vector.y;
    }
    /**
     * Convert the Vector to Angle
     * @returns {Angle} New instance of Angle
     */
    getAngle() {
        return Angle.fromRadians(Math.atan2(this.y, this.x));
    }
    /**
     * Clone the Vector without references
     * @returns {Vector} New instance of Vector
     */
    clone() {
        return new Vector(this.x, this.y);
    }
    /**
     * Alias for `new Vector(0, 0);`
     * @returns {Vector} New instance of Vector
     */
    static zero() {
        return new Vector(0, 0);
    }
    /**
     * Alias for `new Vector(.5, .5);`
     * @returns {Vector} New instance of Vector
     */
    static half() {
        return new Vector(.5, .5);
    }
    /**
     * Alias for `new Vector(1, 1);`
     * @returns {Vector} New instance of Vector
     */
    static one() {
        return new Vector(1, 1);
    }
    /**
      * Alias for `new Vector(0, -1);`
      * @returns {Vector} New instance of Vector
      */
    static top() {
        return new Vector(0, -1);
    }
    /**
      * Alias for `new Vector(0, 1);`
      * @returns {Vector} New instance of Vector
      */
    static bottom() {
        return new Vector(0, 1);
    }
    /**
      * Alias for `new Vector(-1, 0);`
      * @returns {Vector} New instance of Vector
      */
    static left() {
        return new Vector(-1, 0);
    }
    /**
      * Alias for `new Vector(1, 0);`
      * @returns {Vector} New instance of Vector
      */
    static right() {
        return new Vector(1, 0);
    }
}
