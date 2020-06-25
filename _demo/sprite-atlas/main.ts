import { Engine } from "../../Engine.js";
import { SpriteAtlas } from "../../SpriteAtlas.js";


const canvasEl = document.getElementById('canvas')! as HTMLCanvasElement;
const engine = new Engine(canvasEl, 800, 600);
// engine.debuggerBar.enable();


const source = document.createElement('img');
source.src = './images/scream.jpg';
source.addEventListener('load', () => {
    const atlas = new SpriteAtlas(source, {
        name: {
            x: 300,
            y: 450,
            width: 250,
            height: 400,
        }
    });

    engine.loop.addUpdateCallback(() => {
        engine.clear();

        atlas.slices.forEach(slice => {            
            slice.render(engine);
        })
    })

    engine.loop.run()
});
