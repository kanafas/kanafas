export class RenderingLayer {
    constructor(canvas, width, height, pixelScale = 1) {
        this.gizmoVisibility = false;
        this.gizmoScale = 1;
        this.pixelScale = pixelScale;
        this.width = width;
        this.height = height;
        this._canvas = canvas;
        this._canvas.width = width * pixelScale;
        this._canvas.height = height * pixelScale;
        this._canvas.style.width = `${width}px`;
        this._canvas.style.height = `${height}px`;
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
    getImageElement() {
        const canvas = this.getCanvas();
        const imageElement = document.createElement('img');
        imageElement.src = canvas.toDataURL('image/png');
        return imageElement;
    }
}
