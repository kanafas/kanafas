import { Angle } from "./Angle.js";


export interface IVector {
    x: number,
    y: number,
}


export class Vector implements IVector {
    x: number;
    y: number;

    get length(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }


    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }


    add(value: IVector | number): Vector {
        let x: number;
        let y: number;

        if (typeof value == 'number') {
            x = value;
            y = value;
        } else {
            x = value.x;
            y = value.y;
        }

        this.x += x;
        this.y += y;

        return this;
    }


    subtract(value: IVector | number): Vector {
        let x: number;
        let y: number;

        if (typeof value == 'number') {
            x = value;
            y = value;
        } else {
            x = value.x;
            y = value.y;
        }

        this.x -= x;
        this.y -= y;

        return this;
    }


    multiple(value: IVector | number): Vector {
        let x: number;
        let y: number;

        if (typeof value == 'number') {
            x = value;
            y = value;
        } else {
            x = value.x;
            y = value.y;
        }

        this.x *= x;
        this.y *= y;

        return this;
    }


    divide(value: IVector | number): Vector {
        let x: number;
        let y: number;

        if (typeof value == 'number') {
            x = value;
            y = value;
        } else {
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
    normalize(): Vector {
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
    absolute(): Vector {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);

        return this;
    }


    /**
     * TODO: Dodělat popis
     */
    isEquals(vector: Vector): boolean {
        return this.x == vector.x && this.y == vector.y;
    }


    /**
     * Convert the Vector to Angle
     * @returns {Angle} New instance of Angle
     */
    getAngle(): Angle {
        return Angle.fromRadians(Math.atan2(this.y, this.x));
    }


    /**
     * Clone the Vector without references
     * @returns {Vector} New instance of Vector
     */
    clone(): Vector {
        return new Vector(this.x, this.y);
    }


    /**
     * Alias for `new Vector(0, 0);`
     * @returns {Vector} New instance of Vector
     */
    static zero(): Vector {
        return new Vector(0, 0);
    }


    /**
     * Alias for `new Vector(.5, .5);`
     * @returns {Vector} New instance of Vector
     */
    static half(): Vector {
        return new Vector(.5, .5);
    }


    /**
     * Alias for `new Vector(1, 1);`
     * @returns {Vector} New instance of Vector
     */
    static one(): Vector {
        return new Vector(1, 1);
    }


    /**
      * Alias for `new Vector(0, -1);`
      * @returns {Vector} New instance of Vector
      */
    static top(): Vector {
        return new Vector(0, -1);
    }


    /**
      * Alias for `new Vector(0, 1);`
      * @returns {Vector} New instance of Vector
      */
    static bottom(): Vector {
        return new Vector(0, 1);
    }


    /**
      * Alias for `new Vector(-1, 0);`
      * @returns {Vector} New instance of Vector
      */
    static left(): Vector {
        return new Vector(-1, 0);
    }


    /**
      * Alias for `new Vector(1, 0);`
      * @returns {Vector} New instance of Vector
      */
    static right(): Vector {
        return new Vector(1, 0);
    }

}