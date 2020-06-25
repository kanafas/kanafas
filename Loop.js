export class Loop extends EventTarget {
    constructor() {
        super(...arguments);
        this._milliseconds = 0;
        this._startTimestamp = 0;
        this._previousTimestamp = 0;
        this._isRunningToggle = false;
        this._updateCallbacks = [];
        this.update = (milliseconds, delta) => {
            this._updateCallbacks.forEach(callback => callback(milliseconds, delta));
        };
    }
    get milliseconds() {
        return this._milliseconds;
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
    isRunning() {
        return this._isRunningToggle;
    }
    run() {
        this._isRunningToggle = true;
        this._startTimestamp = Date.now();
        this._previousTimestamp = Date.now();
        window.requestAnimationFrame((t => {
            this._animationStep(t);
        }));
        this.dispatchEvent(new RunLoopEvent());
    }
    pause() {
        this._isRunningToggle = false;
        this.dispatchEvent(new RunLoopEvent());
    }
    _animationStep(time) {
        if (!this._isRunningToggle)
            return;
        const delta = ((n) => n > 1 ? n : 1)(time - this._previousTimestamp);
        this.update(this._milliseconds, delta);
        this._previousTimestamp = time;
        this._milliseconds += delta;
        window.requestAnimationFrame((t => {
            this._animationStep(t);
        }));
    }
}
export class RunLoopEvent extends CustomEvent {
    constructor() {
        super(RunLoopEvent.arg);
    }
}
export class StopLoopEvent extends CustomEvent {
    constructor() {
        super(RunLoopEvent.arg);
    }
}
