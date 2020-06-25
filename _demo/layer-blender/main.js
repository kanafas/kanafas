import { Engine } from "../../Engine.js";
import { Utils } from "../../node_modules/kanafas-utils/index.js";
import { LayerBlender } from "../../LayerBlender.js";
import { ImageObject } from "../../renderables/ImageObject.js";
import { NullObject } from "../../renderables/NullObject.js";
import { TextObject } from "../../renderables/TextObject.js";
const canvasEl = document.getElementById('canvas');
const operators = [
    "color" /* Color */,
    "color-burn" /* ColorBurn */,
    "color-dodge" /* ColorDodge */,
    "copy" /* Copy */,
    "darken" /* Darken */,
    "destination-atop" /* DestinationAtop */,
    "destination-in" /* DestinationIn */,
    "destination-out" /* DestinationOut */,
    "destination-over" /* DestinationOver */,
    "difference" /* Difference */,
    "exclusion" /* Exclusion */,
    "hard-light" /* HardLight */,
    "hue" /* Hue */,
    "lighten" /* Lighten */,
    "lighter" /* Lighter */,
    "luminosity" /* Luminosity */,
    "multiply" /* Multiply */,
    "overlay" /* Overlay */,
    "saturation" /* Saturation */,
    "screen" /* Screen */,
    "soft-light" /* SoftLight */,
    "source-atop" /* SourceAtop */,
    "source-in" /* SourceIn */,
    "source-out" /* SourceOut */,
    "source-over" /* SourceOver */,
    "xor" /* XOR */,
];
const margin = 20;
const labelContainerSize = 40;
const size = 100;
const width = margin * 3 + (size * 1.3) * 2;
const height = size * operators.length + margin * 3;
const engine = new Engine(canvasEl, width, height);
// engine.debuggerBar.enable();
async function init() {
    const rainbowCircleImage = await Utils.Loaders.loadImage('./images/rainbow-circle.png');
    const rainbowStarImage = await Utils.Loaders.loadImage('./images/rainbow-star.png');
    const bwCircleImage = await Utils.Loaders.loadImage('./images/bw-circle.png');
    const bwStarImage = await Utils.Loaders.loadImage('./images/bw-star.png');
    function renderExample(operator, iterator) {
        const labelHeight = 40;
        const pivot = new NullObject();
        pivot.transform.position.x = margin;
        pivot.transform.position.y = margin * (iterator + 1) + iterator * (size + labelHeight);
        const label = new TextObject(operator);
        label.transform.setParent(pivot.transform);
        label.font.size = 20;
        label.font.lineHeight = 20;
        const group = new NullObject();
        group.transform.setParent(pivot.transform);
        group.transform.position.y = labelHeight;
        const blender = new LayerBlender(engine.width, engine.height, operator);
        const rainbowCircle = new ImageObject(rainbowCircleImage, size, size);
        rainbowCircle.transform.setParent(group.transform);
        const rainbowStar = new ImageObject(rainbowStarImage, size, size);
        rainbowStar.transform.setParent(rainbowCircle.transform);
        rainbowStar.transform.position.x = size / 3;
        const bwCircle = new ImageObject(bwCircleImage, size, size);
        bwCircle.transform.setParent(group.transform);
        bwCircle.transform.position.x = size * 1.3 + margin;
        const bwStar = new ImageObject(bwStarImage, size, size);
        bwStar.transform.setParent(bwCircle.transform);
        bwStar.transform.position.x = size / 3;
        rainbowCircle.render(blender.lowerLayer);
        bwCircle.render(blender.lowerLayer);
        rainbowStar.render(blender.upperLayer);
        bwStar.render(blender.upperLayer);
        blender.render(engine);
        label.render(engine);
    }
    operators.forEach((operator, i) => {
        renderExample(operator, i);
    });
}
init();
