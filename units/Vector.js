import { Angle } from "./Angle.js";
export class Vector {
    constructor(...values) {
        const v = Vector._parseEntryType_Vector(values);
        this.x = v.x;
        this.y = v.y;
    }
    get length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    add(...values) {
        const v = Vector._parseEntryType_VectorModifier(values);
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    subtract(...values) {
        const v = Vector._parseEntryType_VectorModifier(values);
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    multiple(...values) {
        const v = Vector._parseEntryType_VectorModifier(values);
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }
    divide(...values) {
        const v = Vector._parseEntryType_VectorModifier(values);
        this.x /= v.x;
        this.y /= v.y;
        return this;
    }
    rotate(...values) {
        const value = values[0];
        let degrees;
        if (value instanceof Angle) {
            degrees = value.degrees;
        }
        else {
            degrees = value;
        }
        const length = this.length;
        const angle = this.getAngle().add(degrees);
        const vector = angle.getVector().multiple(length);
        this.x = vector.x;
        this.y = vector.y;
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
     * TODO: Add description
     * @returns {Vector} Same Vector object.
     */
    absolute() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        return this;
    }
    /**
     * TODO: Add description
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
    static get zero() {
        return new Vector(0, 0);
    }
    /**
     * Alias for `new Vector(.5, .5);`
     * @returns {Vector} New instance of Vector
     */
    static get half() {
        return new Vector(.5, .5);
    }
    /**
     * Alias for `new Vector(1, 1);`
     * @returns {Vector} New instance of Vector
     */
    static get one() {
        return new Vector(1, 1);
    }
    /**
      * Alias for `new Vector(0, -1);`
      * @returns {Vector} New instance of Vector
      */
    static get top() {
        return new Vector(0, -1);
    }
    /**
      * Alias for `new Vector(0, 1);`
      * @returns {Vector} New instance of Vector
      */
    static get bottom() {
        return new Vector(0, 1);
    }
    /**
      * Alias for `new Vector(-1, 0);`
      * @returns {Vector} New instance of Vector
      */
    static get left() {
        return new Vector(-1, 0);
    }
    /**
      * Alias for `new Vector(1, 0);`
      * @returns {Vector} New instance of Vector
      */
    static get right() {
        return new Vector(1, 0);
    }
    static distance(vector1, vector2) {
        const a = vector1.x - vector2.x;
        const b = vector1.y - vector2.y;
        return Math.sqrt(a ** 2 + b ** 2);
    }
    static _parseEntryType_Vector(raw) {
        let x;
        let y;
        if (raw.length == 2) {
            x = raw[0];
            y = raw[1];
        }
        else {
            x = raw[0].x;
            y = raw[0].y;
        }
        return { x, y };
    }
    static _parseEntryType_VectorModifier(raw) {
        let x;
        let y;
        if (raw.length == 2) {
            x = raw[0];
            y = raw[1];
        }
        else if (typeof raw[0] == 'number') {
            x = raw[0];
            y = raw[0];
        }
        else {
            x = raw[0].x;
            y = raw[0].y;
        }
        return { x, y };
    }
}
