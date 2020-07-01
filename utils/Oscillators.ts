import { Numbers } from "./Numbers.js";


export namespace Oscillators {
    
    export const sawtooth = (interator: number, frequency: number, min: number = -1, max: number = 1): number => {
        return Numbers.remap(interator % frequency, 0, frequency, min, max);
    }


    export const linear = (interator: number, frequency: number, min: number = -1, max: number = 1): number => {
        return Numbers.remap(Math.abs(sawtooth(interator, frequency, -2, 2)) - 1, -1, 1, min, max);
    }


    export const sinus = (interator: number, frequency: number, min: number = -1, max: number = 1): number => {
        return Numbers.remap(Math.sin(sawtooth(interator, frequency, 0, Math.PI * 2)), -1, 1, min, max);
    }


    export const cosinus = (interator: number, frequency: number, min: number = -1, max: number = 1): number => {
        return Numbers.remap(Math.cos(sawtooth(interator, frequency, 0, Math.PI * 2)), -1, 1, min, max);
    }

}