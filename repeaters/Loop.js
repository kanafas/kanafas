export class Loop extends EventTarget {
    constructor() {
        super(...arguments);
        this._time = 0;
        this._startTimestamp = 0;
        this._previousTimestamp = 0;
        this._isRunningToggle = false;
        this._updateCallbacks = [];
    }
    get time() {
        return this._time;
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
    start() {
        this._isRunningToggle = true;
        this._startTimestamp = Date.now();
        this._previousTimestamp = Date.now();
        window.requestAnimationFrame(t => this._frame(t));
        this.dispatchEvent(new StartLoopEvent());
    }
    stop() {
        this._isRunningToggle = false;
        this.dispatchEvent(new StartLoopEvent());
    }
    update(time, delta) {
        this._updateCallbacks.forEach(callback => callback(time, delta));
    }
    _frame(time) {
        if (!this._isRunningToggle)
            return;
        const delta = ((n) => n > 1 ? n : 1)(time - this._previousTimestamp);
        this.update(this._time, delta);
        this._previousTimestamp = time;
        this._time += delta;
        window.requestAnimationFrame((t => {
            this._frame(t);
        }));
    }
}
export class StartLoopEvent extends CustomEvent {
    constructor() {
        super(StartLoopEvent.arg);
    }
}
export class StopLoopEvent extends CustomEvent {
    constructor() {
        super(StartLoopEvent.arg);
    }
}
