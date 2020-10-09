import { Vector } from "./Vector.js";
export class Angle {
    constructor(degrees = 0) {
        this.degrees = degrees;
    }
    get revolutions() {
        return Angle.degreesToRevelutions(this.degrees);
    }
    set revolutions(revolutions) {
        this.degrees = Angle.revelutionsToDegress(revolutions);
    }
    get radians() {
        return Angle.degreesToRadians(this.degrees);
    }
    set radians(radians) {
        this.degrees = Angle.radiansToDegress(radians);
    }
    /**
     * Add to angle
     * @param {Angle|number} value Angle or number (degrees)
     * @returns {Angle} Same Angle object.
     */
    add(...values) {
        const value = values[0];
        if (value instanceof Angle) {
            this.degrees += value.degrees;
        }
        else {
            this.degrees += value;
        }
        return this;
    }
    /**
     * Subtract of angle
     * @param {Angle|number} value Angle or number (degrees)
     * @returns {Angle} Same Angle object.
     */
    subtract(...values) {
        const value = values[0];
        if (value instanceof Angle) {
            this.degrees -= value.degrees;
        }
        else {
            this.degrees -= value;
        }
        return this;
    }
    /**
     * Multiply the angle
     * @param {Angle|number} value Angle or number (degrees)
     * @returns {Angle} Same Angle object.
     */
    multiply(...values) {
        const value = values[0];
        if (value instanceof Angle) {
            this.degrees *= value.degrees;
        }
        else {
            this.degrees *= value;
        }
        return this;
    }
    /**
     * Divide the angle
     * @param {Angle|number} value Angle or number (degrees)
     * @returns {Angle} Same Angle object.
     */
    divide(...values) {
        const value = values[0];
        if (value instanceof Angle) {
            this.degrees /= value.degrees;
        }
        else {
            this.degrees /= value;
        }
        return this;
    }
    normalize() {
        if (this.degrees > 0) {
            while (this.degrees > 360)
                this.degrees -= 360;
        }
        else if (this.degrees < 0) {
            while (this.degrees < 0)
                this.degrees += 360;
        }
        return this;
    }
    getVector() {
        const angle = this.clone();
        angle.normalize();
        const radians = angle.radians;
        return new Vector(Math.cos(radians), Math.sin(radians));
    }
    clone() {
        return new Angle(this.degrees);
    }
    static fromDegrees(degrees) {
        return new Angle(degrees);
    }
    static fromRadians(radians) {
        const angle = new Angle();
        angle.radians = radians;
        return angle;
    }
    static fromRevolutions(revolutions) {
        const angle = new Angle();
        angle.revolutions = revolutions;
        return angle;
    }
    static zero() {
        return new Angle(0);
    }
    static quarter() {
        return new Angle(90);
    }
    static third() {
        return new Angle(120);
    }
    static half() {
        return new Angle(180);
    }
    static full() {
        return new Angle(360);
    }
    /**
     * Convert degrees to radians
     * @param degrees
     */
    static degreesToRadians(degrees) {
        return (degrees / 180) * Math.PI;
    }
    /**
     * Convert radians to degrees
     * @param radians
     */
    static radiansToDegress(radians) {
        return (radians / Math.PI) * 180;
    }
    /**
     * Convert degrees to revolutions
     * @param degrees
     */
    static degreesToRevelutions(degrees) {
        return degrees / 360;
    }
    /**
     * Convert revolutions to degrees
     * @param revolutions
     */
    static revelutionsToDegress(revolutions) {
        return revolutions * 360;
    }
    /**
     * Convert radians to revolutions
     * @param radians
     */
    static radiansToRevelutions(radians) {
        return radians / (2 * Math.PI);
    }
    /**
     * Convert revolutions to radians
     * @param revolutions
     */
    static revelutionsToRadians(revolutions) {
        return revolutions * (2 * Math.PI);
    }
}
