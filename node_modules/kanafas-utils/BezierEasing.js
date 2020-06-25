export var BezierEasing;
(function (BezierEasing) {
    BezierEasing.custom = (t, p1, p2, p3, p4) => {
        const compute = (t, v1, v2, v3, v4) => {
            return (1 - t) ** 3 * v1 + 3 * (1 - t) ** 2 * t * v2 + 3 * (1 - t) * t ** 2 * v3 + t ** 3 * v4;
        };
        const y = compute(t, p1.y, p2.y, p3.y, p4.y);
        const result = y;
        return result;
    };
    BezierEasing.linear = (t) => {
        return t;
    };
    BezierEasing.ease = (t) => {
        return BezierEasing.custom(t, { x: 0, y: 0 }, { x: 0.25, y: 0.1 }, { x: 0.25, y: 1 }, { x: 1, y: 1 });
    };
    BezierEasing.easeIn = (t) => {
        return BezierEasing.custom(t, { x: 0, y: 0 }, { x: 0.42, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 1 });
    };
    BezierEasing.easeInOut = (t) => {
        return BezierEasing.custom(t, { x: 0, y: 0 }, { x: 0.42, y: 0 }, { x: 0.58, y: 1 }, { x: 1, y: 1 });
    };
    BezierEasing.easeOut = (t) => {
        return BezierEasing.custom(t, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0.58, y: 1 }, { x: 1, y: 1 });
    };
    BezierEasing.easeInSine = (t) => {
        return BezierEasing.custom(t, { x: 0, y: 0 }, { x: 0.47, y: 0 }, { x: 0.745, y: 0.715 }, { x: 1, y: 1 });
    };
    BezierEasing.easeOutSine = (t) => {
        return BezierEasing.custom(t, { x: 0, y: 0 }, { x: 0.39, y: 0.575 }, { x: 0.565, y: 1 }, { x: 1, y: 1 });
    };
    BezierEasing.easeInOutSine = (t) => {
        return BezierEasing.custom(t, { x: 0, y: 0 }, { x: 0.445, y: 0.05 }, { x: 0.55, y: 0.95 }, { x: 1, y: 1 });
    };
    BezierEasing.easeInQuad = (t) => {
        return BezierEasing.custom(t, { x: 0, y: 0 }, { x: 0.55, y: 0.085 }, { x: 0.68, y: 0.53 }, { x: 1, y: 1 });
    };
    BezierEasing.easeOutQuad = (t) => {
        return BezierEasing.custom(t, { x: 0, y: 0 }, { x: 0.25, y: 0.46 }, { x: 0.45, y: 0.94 }, { x: 1, y: 1 });
    };
    BezierEasing.easeInOutQuad = (t) => {
        return BezierEasing.custom(t, { x: 0, y: 0 }, { x: 0.445, y: 0.03 }, { x: 0.515, y: 0.955 }, { x: 1, y: 1 });
    };
})(BezierEasing || (BezierEasing = {}));
