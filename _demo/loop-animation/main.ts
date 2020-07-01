import { Engine } from "../../Engine.js";
import { Fill } from "../../properties/Fill.js";
import { LoopAnimation } from "../../LoopAnimation.js";
import { RoundedRectangleShape } from "../../renderables/RoundedRectangleShape.js";
import { Color } from "../../units/Color.js";
// import { MaterialDesignColorPalatte as Palatte } from "../../Helpers/MaterialDesignColorPalatte.js";


const canvasEl = document.getElementById('canvas')! as HTMLCanvasElement;

const engine = new Engine(canvasEl, 600, 260, window.devicePixelRatio);
// engine.debuggerBar.enable();


const duration = 500;

const r0 = new RoundedRectangleShape(0, 20, 20);
r0.transform.position.x = 50;
r0.transform.position.y = 50;
r0.fill = new Fill(Color.blue());

const r1 = new RoundedRectangleShape(0, 20, 20);
r1.transform.position.x = 50;
r1.transform.position.y = 100;
r1.fill = new Fill(Color.green());

const r2 = new RoundedRectangleShape(0, 20, 20);
r2.transform.position.x = 50;
r2.transform.position.y = 150;
r2.fill = new Fill(Color.red());

const r3 = new RoundedRectangleShape(0, 20, 20);
r3.transform.position.x = 50;
r3.transform.position.y = 200;
r3.fill = new Fill(Color.yellow());


const timeline1 = new LoopAnimation((milliseconds: number, delta: number) => {
    r1.width = (engine.width - 100) * (milliseconds / timeline1.duration);
    r1.render(engine);
}, duration, 0, true);

// engine.debuggerBar.addTimeline(timeline1);

const timeline2 = new LoopAnimation((milliseconds: number, delta: number) => {
    r2.width = (engine.width - 100) * (milliseconds / timeline1.duration);
    r2.render(engine);
}, duration, 100, true);

const timeline3 = new LoopAnimation((milliseconds: number, delta: number) => {
    r3.width = (engine.width - 100) * (milliseconds / timeline1.duration);
    r3.render(engine);
}, duration, 100, false);


engine.loop.addUpdateCallback((milliseconds: number, delta: number) => {
    engine.clear();

    r0.width = (engine.width - 100) * (milliseconds / duration);
    r0.render(engine);

    timeline1.update(milliseconds, delta)
    timeline2.update(milliseconds, delta)
    timeline3.update(milliseconds, delta)
});

engine.loop.run();