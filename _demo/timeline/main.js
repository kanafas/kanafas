import { Engine } from "../../Engine.js";
import { RectangleShape } from "../../renderables/RectangleShape.js";
import { Fill } from "../../properties/Fill.js";
// import { MaterialDesignColorPalatte as Palatte } from "../../Helpers/MaterialDesignColorPalatte.js";
import { Timeline } from "../../Timeline.js";
import { Color } from "../../node_modules/kanafas-units/Color.js";
const canvasEl = document.getElementById('canvas');
const engine = new Engine(canvasEl, 400, 60, window.devicePixelRatio);
// engine.debuggerBar.enable();
const rectangle = new RectangleShape(0, 20);
rectangle.transform.position.x = 20;
rectangle.transform.position.y = 20;
// rectangle.fill = new Fill(Palatte.green());
rectangle.fill = new Fill(Color.green());
const scene = new Timeline(60);
scene.addUpdateCallback((frames) => {
    engine.clear();
    rectangle.width += 2;
    rectangle.render(engine);
});
engine.loop.addUpdateCallback((miliseconds, delta) => {
    scene.playByLoop(miliseconds, delta);
});
engine.loop.run();
