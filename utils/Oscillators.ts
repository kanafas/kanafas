import { Numbers } from "./Numbers.js";


export class Oscillators {

    static sawtooth(interator: number, frequency: number, min: number = -1, max: number = 1): number {
        return Numbers.remap(interator % frequency, 0, frequency, min, max);
    }


    static linear(interator: number, frequency: number, min: number = -1, max: number = 1): number {
        return Numbers.remap(Math.abs(Oscillators.sawtooth(interator, frequency, -2, 2)) - 1, -1, 1, min, max);
    }


    static sinus(interator: number, frequency: number, min: number = -1, max: number = 1): number {
        return Numbers.remap(Math.sin(Oscillators.sawtooth(interator, frequency, 0, Math.PI * 2)), -1, 1, min, max);
    }


    static cosinus(interator: number, frequency: number, min: number = -1, max: number = 1): number {
        return Numbers.remap(Math.cos(Oscillators.sawtooth(interator, frequency, 0, Math.PI * 2)), -1, 1, min, max);
    }

}