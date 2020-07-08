import { IVector } from "../units/Vector.js";


export class BezierEasing {

    static custom(t: number, p1: IVector, p2: IVector, p3: IVector, p4: IVector): number {
        const compute = (t: number, v1: number, v2: number, v3: number, v4: number): number => {
            return (1 - t) ** 3 * v1 + 3 * (1 - t) ** 2 * t * v2 + 3 * (1 - t) * t ** 2 * v3 + t ** 3 * v4;
        }

        const y = compute(t, p1.y, p2.y, p3.y, p4.y);
        const result = y;

        return result;
    }


    static linear(t: number): number {
        return t;
    }


    static ease(t: number): number {
        return BezierEasing.custom(t,
            { x: 0, y: 0 },
            { x: 0.25, y: 0.1 },
            { x: 0.25, y: 1 },
            { x: 1, y: 1 });
    }


    static easeIn(t: number): number {
        return BezierEasing.custom(t,
            { x: 0, y: 0 },
            { x: 0.42, y: 0 },
            { x: 1, y: 1 },
            { x: 1, y: 1 });
    }


    static easeInOut(t: number): number {
        return BezierEasing.custom(t,
            { x: 0, y: 0 },
            { x: 0.42, y: 0 },
            { x: 0.58, y: 1 },
            { x: 1, y: 1 });
    }


    static easeOut(t: number): number {
        return BezierEasing.custom(t,
            { x: 0, y: 0 },
            { x: 0, y: 0 },
            { x: 0.58, y: 1 },
            { x: 1, y: 1 });
    }


    static easeInSine(t: number): number {
        return BezierEasing.custom(t,
            { x: 0, y: 0 },
            { x: 0.47, y: 0 },
            { x: 0.745, y: 0.715 },
            { x: 1, y: 1 });
    }


    static easeOutSine(t: number): number {
        return BezierEasing.custom(t,
            { x: 0, y: 0 },
            { x: 0.39, y: 0.575 },
            { x: 0.565, y: 1 },
            { x: 1, y: 1 });
    }


    static easeInOutSine(t: number): number {
        return BezierEasing.custom(t,
            { x: 0, y: 0 },
            { x: 0.445, y: 0.05 },
            { x: 0.55, y: 0.95 },
            { x: 1, y: 1 });
    }


    static easeInQuad(t: number): number {
        return BezierEasing.custom(t,
            { x: 0, y: 0 },
            { x: 0.55, y: 0.085 },
            { x: 0.68, y: 0.53 },
            { x: 1, y: 1 });
    }


    static easeOutQuad(t: number): number {
        return BezierEasing.custom(t,
            { x: 0, y: 0 },
            { x: 0.25, y: 0.46 },
            { x: 0.45, y: 0.94 },
            { x: 1, y: 1 });
    }


    static easeInOutQuad(t: number): number {
        return BezierEasing.custom(t,
            { x: 0, y: 0 },
            { x: 0.445, y: 0.03 },
            { x: 0.515, y: 0.955 },
            { x: 1, y: 1 });
    }

}
