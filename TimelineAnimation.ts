import { Utils } from "./utils/index.js";
import { ITimelineUpdateCallback } from "./Timeline.js";
import { IAnimation } from "./Animation.js";


export class TimelineAnimation implements IAnimation<ITimelineUpdateCallback> {

    private _callback: ITimelineUpdateCallback;

    duration: number;
    delay: number;
    looping: boolean;

    private _frames: number = 0;
    get frames(): number {
        return this.frames;
    }
    
    
    constructor(callback: ITimelineUpdateCallback, duration: number, delay: number, looping: boolean) {
        this._callback = callback;
        
        this.duration = duration;
        this.delay = delay;
        this.looping = looping;
    }


    isFirstIteration(): boolean {
        return this.frames == 0;
    }


    isLastIteration(): boolean {
        return this.frames == this.duration -1;
    }


    getNumberOfCycles(): number {
        // TODO: Otestovat negativní hodnoty
        return Math.floor(this.frames / this.duration);
    }


    update: ITimelineUpdateCallback = (frames: number) => {
        this._frames = TimelineAnimation.convertGlobalFramesToLocal(frames, this.duration, this.delay, this.looping);;

        this._callback(this._frames);
    }


    static convertGlobalFramesToLocal(frames: number, duration: number, delay: number, looping: boolean): number {
        const f = frames - delay;

        if (looping) {
            return f % duration;
        } else {
            return Utils.Numbers.limit(f, 0, duration -1);
        }
    }
}