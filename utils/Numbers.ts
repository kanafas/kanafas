import { IVector } from "../units/Vector.js";


export class Numbers {

    /**
     * Remapuje hodnotu na novou škálu
     * @param value Současná hodnota na remaping
     * @param min1 Současné minumunm
     * @param max1 Současné maximum
     * @param min2 Nové minimum
     * @param max2 Nové maximum
     */
    static remap(value: number, min1: number, max1: number, min2: number = 0, max2: number = 1): number {
        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }


    /**
     * „Ořízne“ číslo pokud není v zadaném rozsahu.
     * @param {number} value 
     * @param {number} min 
     * @param {number} max 
     */
    static limit(value: number, min: number, max: number) {
        return Math.min(Math.max(value, min), max);
    }


    /**
     * Vrátí náhodné číslo v daném rozsahu. <min, max)
     * @param min Minumum inkluzivně
     * @param max Maximum exkluzivně
     */
    static randomArbitrary(min: number = 0, max: number = 1): number {
        return Math.random() * (max - min) + min;
    }


    /**
     * Vrátí náhodné celé číslo v daném rozsahu. <min, max>
     * @param min Minumum inkluzivně
     * @param max Maximum inkluzivně
     */
    static randomInt(min: number = 0, max: number = 1): number {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    /**
     * Vrátí bod na křivce
     * @param t Procentuální průběh křivky <0, 1>
     * @param p1 Počáteční bod <0, 1>
     * @param p2 Koncový bod <0, 1>
     */
    static bezierCurve2(t: number, p1: IVector, p2: IVector): IVector {
        const compute = (t: number, v1: number, v2: number): number => {
            return (1 - t) * v1 + t * v2;
        }

        return {
            x: compute(t, p1.x, p2.x),
            y: compute(t, p1.y, p2.y),
        }
    }


    /**
     * Vrátí bod na křivce
     * @param t Procentuální průběh křivky <0, 1>
     * @param p1 Počáteční bod <0, 1>
     * @param p2 Společné táhlo <0, 1>
     * @param p3 Koncový bod <0, 1>
     */
    static bezierCurve3(t: number, p1: IVector, p2: IVector, p3: IVector): IVector {
        const compute = (t: number, v1: number, v2: number, v3: number): number => {
            return (1 - t) ** 2 * v1 + 2 * (1 - t) * t * v2 + t ** 2 * v3;
        }

        return {
            x: compute(t, p1.x, p2.x, p3.x),
            y: compute(t, p1.y, p2.y, p3.y),
        }
    }


    /**
     * Vrátí bod na křivce
     * @param t Procentuální průběh křivky <0, 1>
     * @param p1 Počáteční bod <0, 1>
     * @param p2 Táhlo počáteční bodu <0, 1>
     * @param p3 Táhlo koncového bodu <0, 1>
     * @param p4 Koncový bod <0, 1>
     */
    static bezierCurve4(t: number, p1: IVector, p2: IVector, p3: IVector, p4: IVector): IVector {
        const compute = (t: number, v1: number, v2: number, v3: number, v4: number): number => {
            return (1 - t) ** 3 * v1 + 3 * (1 - t) ** 2 * t * v2 + 3 * (1 - t) * t ** 2 * v3 + t ** 3 * v4;
        }

        return {
            x: compute(t, p1.x, p2.x, p3.x, p4.x),
            y: compute(t, p1.y, p2.y, p3.y, p4.y),
        }
    }

}