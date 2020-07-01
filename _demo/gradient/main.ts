import { Engine } from "../../Engine.js";
import { Vector } from "../../units/index.js";
import { Fill } from "../../properties/Fill.js";
import { Color } from "../../styles/Color.js";
import { LinearGradient } from "../../styles/LinearGradient.js";
import { RectangleShape } from "../../renderables/RectangleShape.js";
import { RadialGradient } from "../../styles/RadialGradient.js";


const canvasEl = document.getElementById('canvas')! as HTMLCanvasElement;
const engine = new Engine(canvasEl, 650, 450);
// engine.debuggerBar.enable();


const linearGradient = new LinearGradient(Vector.zero(), Vector.right(), [
    {
        color: Color.yellow(),
        offset: 0
    },
    {
        color: Color.red(),
        offset: 1
    }
]);

const radialGradient = new RadialGradient(Vector.half(), Vector.one(), [
    {
        color: Color.green(),
        offset: 0
    },
    {
        color: Color.blue(),
        offset: 1
    }
]);

const rectangle1 = new RectangleShape(300, 200);
rectangle1.transform.position.x = 50;
rectangle1.transform.position.y = 50;
rectangle1.fill = new Fill(linearGradient);

const rectangle2 = new RectangleShape(300, 200);
rectangle2.transform.position.x = 300;
rectangle2.transform.position.y = 200;
rectangle2.fill = new Fill(radialGradient);

engine.loop.addUpdateCallback(() => {
    engine.clear();

    rectangle1.render(engine);
    rectangle2.render(engine);
});

engine.loop.run();