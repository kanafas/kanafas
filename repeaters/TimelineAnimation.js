import { Utils } from "../utils/Utils.js";
export class TimelineAnimation {
    constructor(callback, duration, delay, looping) {
        this._frames = 0;
        this.update = (frames) => {
            this._frames = TimelineAnimation.convertGlobalFramesToLocal(frames, this.duration, this.delay, this.looping);
            ;
            this._callback(this._frames);
        };
        this._callback = callback;
        this.duration = duration;
        this.delay = delay;
        this.looping = looping;
    }
    get frames() {
        return this.frames;
    }
    isFirstIteration() {
        return this.frames == 0;
    }
    isLastIteration() {
        return this.frames == this.duration - 1;
    }
    getNumberOfCycles() {
        // TODO: Otestovat negativní hodnoty
        return Math.floor(this.frames / this.duration);
    }
    static convertGlobalFramesToLocal(frames, duration, delay, looping) {
        const f = frames - delay;
        if (looping) {
            return f % duration;
        }
        else {
            return Utils.Numbers.limit(f, 0, duration - 1);
        }
    }
}
