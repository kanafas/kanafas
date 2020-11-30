import { ILoopUpdateCallback } from "./Loop.js";
import { IAnimation } from "./IAnimation.js";
import { Utils } from "../utils/Utils.js";


export class LoopAnimation implements IAnimation<ILoopUpdateCallback> {

    private _callback: ILoopUpdateCallback;

    duration: number;
    delay: number;
    looping: boolean

    private _time: number = 0;
    get time(): number {
        return this._time;
    }


    constructor(callback: ILoopUpdateCallback, duration: number, delay: number, looping: boolean) {
        this._callback = callback;

        this.duration = duration;
        this.delay = delay;
        this.looping = looping;
    }


    isFirstIteration(): boolean {
        return this.time == 0;
    }


    isLastIteration(): boolean {
        return this.time == this.duration;
    }


    getNumberOfCycles(): number {
        // TODO: Otestovat negativní hodnoty
        return Math.floor(this.time / this.duration);
    }


    update: ILoopUpdateCallback = (time: number, delta: number) => {
        this._time = LoopAnimation.convertGlobalMilisecondsToLocal(time, this.duration, this.delay, this.looping);;

        this._callback(time, delta);
    }


    static convertGlobalMilisecondsToLocal(time: number, duration: number, delay: number, looping: boolean): number {
        const m = time - delay;

        if (looping) {
            return m % duration;
        } else {
            return Utils.Numbers.limit(m, 0, duration);
        }
    }
}