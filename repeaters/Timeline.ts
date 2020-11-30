import { ILoopUpdateCallback } from "./Loop.js";


export interface ITimelineUpdateCallback {
    (frames: number): void
}


export class Timeline {

    readonly fps: number;

    private _frames: number = 0;
    get frames(): number {
        return this._frames;
    }

    private _updateCallbacks: ITimelineUpdateCallback[] = [];


    constructor(fps: number) {
        if (fps <= 0) {
            throw new Error(`Fps is not positive number.`);
        }

        this.fps = fps;
    }


    addUpdateCallback(callback: ITimelineUpdateCallback) {
        this._updateCallbacks.push(callback);
    }


    removeUpdateCallback(callback: ITimelineUpdateCallback) {
        const i = this._updateCallbacks.indexOf(callback);

        if (i == -1) {
            throw new Error("Callback not found.");
        }

        this._updateCallbacks.splice(i, 1);
    }


    update: ITimelineUpdateCallback = (frames: number) => {
        this._updateCallbacks.forEach(callback => callback(frames));
    }


    playByLoop: ILoopUpdateCallback = (time: number, delta: number) => {
        const framesFromLoop = Math.floor(time / (1000 / this.fps));

        if (framesFromLoop > this.frames) {
            const iterations = framesFromLoop - this.frames;

            for (let i = 0; i < iterations; i++) {
                this._frames++;
                this.update(this._frames);
            }

        } else if (framesFromLoop > this.frames) {
            const iterations = this.frames - framesFromLoop;

            for (let i = 0; i < iterations; i++) {
                this._frames--;
                this.update(this._frames);
            }
        }
    }


    rewind(frames: number = 1) {
        if (frames <= 0) return;

        for (let i = 0; i < frames; i++) {
            this._frames--;
            this.update(this._frames);
        }
    }


    forward(frames: number = 1) {
        if (frames <= 0) return;

        for (let i = 0; i < frames; i++) {
            this._frames++;
            this.update(this._frames);
        }
    }

}