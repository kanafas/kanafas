import { Engine } from "../../Engine.js";
import { RectangleShape } from "../../renderables/RectangleShape.js";
import { Fill } from "../../properties/Fill.js";
import { Color } from "../../styles/Color.js";
import { EllipseShape } from "../../renderables/EllipseShape.js";
import { TrackAlpha } from "../../TrackAlpha.js";
import { Stroke } from "../../properties/Stroke.js";
import { Utils } from "../../Utils/Utils.js";


const canvasEl = document.getElementById('canvas')! as HTMLCanvasElement;
const engine = new Engine(canvasEl, 800, 600);
// engine.debuggerBar.enable();


const rectangle = new RectangleShape(200, 200);
rectangle.transform.position.x = 100;
rectangle.transform.position.y = 100;
rectangle.fill = new Fill(Color.red());
rectangle.stroke = new Stroke(Color.black(), 2);

const oval = new EllipseShape(200, 200);
oval.transform.position.x = 200;
oval.transform.position.y = 200;
oval.fill = new Fill(Color.blue());
oval.stroke = new Stroke(Color.red(), 2);


const matte = new TrackAlpha(engine.width, engine.height, true);


engine.loop.addUpdateCallback((tickTime) => {
    engine.clear();
    matte.clear();

    rectangle.transform.position.x = Utils.Oscillators.sinus(tickTime, 400, 50, 100);
    rectangle.transform.position.y = Utils.Oscillators.sinus(tickTime, 200, 50, 100);
    oval.transform.position.y = Utils.Oscillators.sinus(tickTime, 200, -20, 20);

    rectangle.render(matte.sourceLayer);
    oval.render(matte.matteLayer);
    matte.render(engine);
});

engine.loop.run();