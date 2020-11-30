export class RenderingLayer {
    constructor(canvas, width, height, pixelScale = 1, updateStyleSize = true) {
        this._width = 0;
        this._height = 0;
        this.gizmoVisibility = false;
        this.gizmoScale = 1;
        this.updateStyleSizeCallback = RenderingLayer.DEFAULT_UPDATESIZE_CALLBACK;
        this._canvas = canvas;
        this._pixelScale = !isNaN(pixelScale) ? pixelScale : 1;
        this._updateStyleSize = updateStyleSize;
        this.updateSize(width, height, this._pixelScale, this._updateStyleSize);
    }
    static get PIXELSCALE() { return window.devicePixelRatio; }
    get pixelScale() { return this._pixelScale; }
    get width() { return this._width; }
    get height() { return this._height; }
    /**
     *
     * @param width Width of canvas.
     * @param height Height of canvas.
     * @param pixelScale Resolution scale for retina stuff. If `undefined`, will used value from last time.
     * @param updateStyleSize If it is `true`, the style will be set by the callback `updateStyleSizeCallback`. If `undefined`, will used value from last time.

     */
    updateSize(width, height, pixelScale, updateStyleSize) {
        if (pixelScale !== undefined)
            this._pixelScale = Math.max(pixelScale, 0);
        if (updateStyleSize !== undefined)
            this._updateStyleSize = updateStyleSize;
        this._width = Math.max(width, 0);
        this._height = Math.max(height, 0);
        this._canvas.width = this._width * this._pixelScale;
        this._canvas.height = this._height * this._pixelScale;
        if (this._updateStyleSize)
            this.updateStyleSizeCallback(this._canvas, this._width, this._height, this._pixelScale);
        this._renderingContext = this._canvas.getContext('2d');
    }
    clear() {
        const pxs = this.pixelScale;
        this.resetMatrix();
        this._renderingContext.clearRect(0, 0, this.width * pxs, this.height * pxs);
    }
    getRenderingContext() {
        return this._renderingContext;
    }
    resetRenderingContext() {
        this._renderingContext = this._canvas.getContext('2d');
    }
    setImageSmoothing(toggle) {
        const ctx = this.getRenderingContext();
        ctx.msImageSmoothingEnabled = toggle;
        ctx.mozImageSmoothingEnabled = toggle;
        ctx.webkitImageSmoothingEnabled = toggle;
        ctx.imageSmoothingEnabled = toggle;
    }
    getCanvas() {
        return this._canvas;
    }
    setMatrixToTransform(transform) {
        this.resetMatrix();
        const pxs = this.pixelScale;
        const path = [];
        let t = transform;
        path.unshift(t);
        while (t.hasParent()) {
            t = t.getParent();
            path.unshift(t);
        }
        path.forEach(t => {
            this._renderingContext.translate(t.position.x * pxs, t.position.y * pxs);
            this._renderingContext.rotate(t.rotation.radians);
            this._renderingContext.scale(t.scale.x, t.scale.y);
        });
    }
    resetMatrix() {
        this._renderingContext.resetTransform();
    }
}
RenderingLayer.DEFAULT_UPDATESIZE_CALLBACK = (canvas, width, height, pixelScale) => {
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
};
