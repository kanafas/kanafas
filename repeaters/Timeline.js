export class Timeline {
    constructor(fps) {
        this._frames = 0;
        this._updateCallbacks = [];
        this.update = (frames) => {
            this._updateCallbacks.forEach(callback => callback(frames));
        };
        this.playByLoop = (time, delta) => {
            const framesFromLoop = Math.floor(time / (1000 / this.fps));
            if (framesFromLoop > this.frames) {
                const iterations = framesFromLoop - this.frames;
                for (let i = 0; i < iterations; i++) {
                    this._frames++;
                    this.update(this._frames);
                }
            }
            else if (framesFromLoop > this.frames) {
                const iterations = this.frames - framesFromLoop;
                for (let i = 0; i < iterations; i++) {
                    this._frames--;
                    this.update(this._frames);
                }
            }
        };
        if (fps <= 0) {
            throw new Error(`Fps is not positive number.`);
        }
        this.fps = fps;
    }
    get frames() {
        return this._frames;
    }
    addUpdateCallback(callback) {
        this._updateCallbacks.push(callback);
    }
    removeUpdateCallback(callback) {
        const i = this._updateCallbacks.indexOf(callback);
        if (i == -1) {
            throw new Error("Callback not found.");
        }
        this._updateCallbacks.splice(i, 1);
    }
    rewind(frames = 1) {
        if (frames <= 0)
            return;
        for (let i = 0; i < frames; i++) {
            this._frames--;
            this.update(this._frames);
        }
    }
    forward(frames = 1) {
        if (frames <= 0)
            return;
        for (let i = 0; i < frames; i++) {
            this._frames++;
            this.update(this._frames);
        }
    }
}
