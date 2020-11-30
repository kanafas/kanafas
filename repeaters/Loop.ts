export interface ILoopUpdateCallback {
    /**
     * @param time Number of milliseconds elapsed.
     * @param delta Time in milliseconds since the previous frame.
     */
    (time: number, delta: number): void
}


export class Loop extends EventTarget {

    private _time: number = 0;
    get time(): number {
        return this._time;
    }

    private _startTimestamp: number = 0;
    private _previousTimestamp: number = 0;

    private _isRunningToggle: boolean = false;

    private _updateCallbacks: ILoopUpdateCallback[] = [];


    addUpdateCallback(callback: ILoopUpdateCallback) {
        this._updateCallbacks.push(callback);
    }


    removeUpdateCallback(callback: ILoopUpdateCallback) {
        const i = this._updateCallbacks.indexOf(callback);

        if (i == -1) {
            throw new Error("Callback not found.");
        }

        this._updateCallbacks.splice(i, 1);
    }


    isRunning(): boolean {
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


    update(time: number, delta: number) {
        this._updateCallbacks.forEach(callback => callback(time, delta));
    }


    private _frame(time: number) {
        if (!this._isRunningToggle) return;

        const delta = ((n: number) => n > 1 ? n : 1)(time - this._previousTimestamp);

        this.update(this._time, delta);

        this._previousTimestamp = time;
        this._time += delta;

        window.requestAnimationFrame((t => {
            this._frame(t);
        }));
    }

}


export class StartLoopEvent extends CustomEvent<{}> {
    static arg: 'start';

    constructor() {
        super(StartLoopEvent.arg);
    }
}


export class StopLoopEvent extends CustomEvent<{}> {
    static arg: 'stop';

    constructor() {
        super(StartLoopEvent.arg);
    }
}