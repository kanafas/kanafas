import { Utils } from "./Utils/Utils.js";
export class LoopAnimation {
    constructor(callback, duration, delay, looping) {
        this._miliseconds = 0;
        this.update = (milliseconds, delta) => {
            this._miliseconds = LoopAnimation.convertGlobalMilisecondsToLocal(milliseconds, this.duration, this.delay, this.looping);
            ;
            this._callback(milliseconds, delta);
        };
        this._callback = callback;
        this.duration = duration;
        this.delay = delay;
        this.looping = looping;
    }
    get miliseconds() {
        return this._miliseconds;
    }
    isFirstIteration() {
        return this.miliseconds == 0;
    }
    isLastIteration() {
        return this.miliseconds == this.duration;
    }
    getNumberOfCycles() {
        // TODO: Otestovat negativní hodnoty
        return Math.floor(this.miliseconds / this.duration);
    }
    static convertGlobalMilisecondsToLocal(miliseconds, duration, delay, looping) {
        const m = miliseconds - delay;
        if (looping) {
            return m % duration;
        }
        else {
            return Utils.Numbers.limit(m, 0, duration);
        }
    }
}
