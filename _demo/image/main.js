import { ImageObject } from "../../renderables/ImageObject.js";
import { Engine } from "../../Engine.js";
// import { DebuggerBar } from "../../Debugger/DebuggerBar.js";
const canvasEl = document.getElementById('canvas');
const engine = new Engine(canvasEl, 800, 600);
// engine.debuggerBar.enable();
const source = document.createElement('img');
source.src = 'https://www.w3schools.com/graphics/pic_the_scream.jpg';
source.addEventListener('load', () => {
    const image = new ImageObject(source);
    image.transform.position.x = 60;
    image.transform.position.y = 80;
    engine.loop.addUpdateCallback(() => {
        engine.clear();
        image.render(engine);
    });
    engine.loop.run();
});
