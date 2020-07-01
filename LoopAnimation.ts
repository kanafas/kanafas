import { Utils } from "./utils/index.js";
import { ILoopUpdateCallback } from "./Loop.js";
import { IAnimation } from "./Animation.js";


export class LoopAnimation implements IAnimation<ILoopUpdateCallback> {

    private _callback: ILoopUpdateCallback;

    duration: number;
    delay: number;
    looping: boolean

    private _miliseconds: number = 0;
    get miliseconds(): number {
        return this.miliseconds;
    }


    constructor(callback: ILoopUpdateCallback, duration: number, delay: number, looping: boolean) {
        this._callback = callback;

        this.duration = duration;
        this.delay = delay;
        this.looping = looping;
    }


    isFirstIteration(): boolean {
        return this.miliseconds == 0;
    }


    isLastIteration(): boolean {
        return this.miliseconds == this.duration;
    }


    getNumberOfCycles(): number {
        // TODO: Otestovat negativní hodnoty
        return Math.floor(this.miliseconds / this.duration);
    }


    update: ILoopUpdateCallback = (milliseconds: number, delta: number) => {
        this._miliseconds = LoopAnimation.convertGlobalMilisecondsToLocal(milliseconds, this.duration, this.delay, this.looping);;

        this._callback(milliseconds, delta);
    }


    static convertGlobalMilisecondsToLocal(miliseconds: number, duration: number, delay: number, looping: boolean): number {
        const m = miliseconds - delay;

        if (looping) {
            return m % duration;
        } else {
            return Utils.Numbers.limit(m, 0, duration);
        }
    }
}