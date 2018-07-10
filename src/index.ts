import Shapes from "./data/dataShape"
import CanvasState from "./classes/canvasState";

const canvas: any = document.getElementById('canvas');

function updateWindow(){
    canvas.width = window.innerWidth - 80;
    canvas.height = window.innerHeight - 80;
    let state: any = new CanvasState(canvas, Shapes);
}

updateWindow();

window.addEventListener('resize', updateWindow, false);