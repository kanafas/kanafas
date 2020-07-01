import { Engine } from "../../Engine.js";
import { RectangleShape } from "../../renderables/RectangleShape.js";
import { Vector } from "../../units/Vector.js";
import { Fill } from "../../properties/Fill.js";
import { Stroke } from "../../properties/Stroke.js";
import { EllipseShape } from "../../renderables/EllipseShape.js";
import { PieShape } from "../../renderables/PieShape.js";
import { Angle } from "../../units/Angle.js";
import { RoundedRectangleShape } from "../../renderables/RoundedRectangleShape.js";
import { Color } from "../../styles/Color.js";
import { PolygonShape } from "../../renderables/PolygonShape.js";

const canvasEl = document.getElementById('canvas')! as HTMLCanvasElement;

const engine = new Engine(canvasEl, 800, 600, window.devicePixelRatio);
// engine.debuggerBar.enable();


const offset = new Vector(105, 70);

const stroke = new Stroke(Color.black(), 2)

const rectangle = new RectangleShape(200, 200);
rectangle.transform.position.x = offset.x;
rectangle.transform.position.y = offset.y;
rectangle.fill = new Fill(Color.green(.6));
rectangle.stroke = stroke;


const ellipse = new EllipseShape(200, 200);
ellipse.transform.setParent(rectangle.transform);
ellipse.transform.position.x = offset.x;
ellipse.transform.position.y = offset.y;
ellipse.fill = new Fill(Color.red(.6));
ellipse.stroke = stroke;


const round = new RoundedRectangleShape(200, 200, 20);
round.transform.setParent(ellipse.transform);
round.transform.position.x = offset.x;
round.transform.position.y = offset.y;
round.fill = new Fill(Color.blue(.6));
round.stroke = stroke;


const pie = new PieShape(200, 200, new Angle(60), new Angle(390), .5);
pie.transform.setParent(round.transform);
pie.transform.position.x = offset.x;
pie.transform.position.y = offset.y;
pie.fill = new Fill(Color.yellow(.6));
pie.stroke = stroke;

const polygon = new PolygonShape([
    { x: 0, y: 0 },
    { x: 200, y: 0 },
    { x: 200, y: 200 },
    { x: 0, y: 200 },
], true, .1, .9, 0)
polygon.transform.setParent(pie.transform);
polygon.transform.position.x = offset.x;
polygon.transform.position.y = offset.y;
polygon.fill = new Fill(Color.green(.6));
polygon.stroke = stroke;

// polygon.trimEnd = 0;
// polygon.trimStart = .6;
// polygon.trimOffset = 0;

console.log(polygon.trimEnd, polygon.trimStart, polygon.trimOffset);


engine.loop.addUpdateCallback(() => {
    engine.clear();

    // polygon.trimOffset += .006;
    
    rectangle.render(engine);
    ellipse.render(engine);
    round.render(engine);
    pie.render(engine);
    polygon.render(engine);
});

engine.loop.run();