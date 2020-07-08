export interface ILoopUpdateCallback {
    /**
     * @param tickTime Počet uplinulích framů
     * @param delta Čas v milisekundách od předchozého framu
     */
    (milliseconds: number, delta: number): void
}


export class Loop extends EventTarget {

    private _milliseconds: number = 0;
    get milliseconds(): number {
        return this._milliseconds;
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


    update: ILoopUpdateCallback = (milliseconds: number, delta: number) => {
        this._updateCallbacks.forEach(callback => callback(milliseconds, delta));
    }


    private _animationStep(time: number) {
        if (!this._isRunningToggle) return;

        const delta = ((n: number) => n > 1 ? n : 1)(time - this._previousTimestamp);

        this.update(this._milliseconds, delta);

        this._previousTimestamp = time;
        this._milliseconds += delta;

        window.requestAnimationFrame((t => {
            this._animationStep(t);
        }));
    }

}


export class RunLoopEvent extends CustomEvent<{}> {
    static arg: 'run-loop';

    constructor() {
        super(RunLoopEvent.arg);
    }
}


export class StopLoopEvent extends CustomEvent<{}> {
    static arg: 'stop-loop';

    constructor() {
        super(RunLoopEvent.arg);
    }
}