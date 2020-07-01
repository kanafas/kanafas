import { Numbers } from "./Numbers.js";
export var Oscillators;
(function (Oscillators) {
    Oscillators.sawtooth = (interator, frequency, min = -1, max = 1) => {
        return Numbers.remap(interator % frequency, 0, frequency, min, max);
    };
    Oscillators.linear = (interator, frequency, min = -1, max = 1) => {
        return Numbers.remap(Math.abs(Oscillators.sawtooth(interator, frequency, -2, 2)) - 1, -1, 1, min, max);
    };
    Oscillators.sinus = (interator, frequency, min = -1, max = 1) => {
        return Numbers.remap(Math.sin(Oscillators.sawtooth(interator, frequency, 0, Math.PI * 2)), -1, 1, min, max);
    };
    Oscillators.cosinus = (interator, frequency, min = -1, max = 1) => {
        return Numbers.remap(Math.cos(Oscillators.sawtooth(interator, frequency, 0, Math.PI * 2)), -1, 1, min, max);
    };
})(Oscillators || (Oscillators = {}));
