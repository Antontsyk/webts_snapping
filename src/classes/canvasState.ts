import Point from "./point";
import Shape from "./shape";
import checkIsEnd from "./overlay/checkIsEnd";
import snappingShape from "./snapping/snapping";
import overlayHelper from "./overlay/overlayHelper";

export default class CanvasState {
    private canvas: HTMLElement;
    private width: number;
    private height: number;
    private context: any;
    private shapes: Array<Shape> = [];
    private selection: Shape = null;
    private deltaMouse: Point = {x: 0, y: 0};
    private startPosition: Point = {x: 0, y: 0};

    constructor(canvas: any, shapes: Array<Shape>) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = canvas.getContext('2d');
        this.shapes = shapes;
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this), true);
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this), true);
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this), true);
        this.draw();
    }

    private onMouseDown(event: MouseEvent) {
        const mouse: any = this.getMouse(event);
        const mx: number = mouse.x;
        const my: number = mouse.y;

        this.selection = this.shapes.find((shape: Shape) => {
            return this.context.isPointInPath(shape.path, mx, my)
        });

        if (this.selection) {
            this.startPosition = {
                x: this.selection.x,
                y: this.selection.y
            };
            this.deltaMouse = {x: mx - this.selection.x, y: my - this.selection.y};
            this.draw();
        }
    }

    private onMouseMove(event: MouseEvent) {
        if (!this.selection) {
            return;
        }
        const mouse: any = this.getMouse(event);
        this.selection.updateShape(mouse.x - this.deltaMouse.x, mouse.y - this.deltaMouse.y);

        const snappingPosition = snappingShape(this.shapes, this.selection);
        this.selection.updateShape(snappingPosition.x, snappingPosition.y);

        const checkIsEndPosition = checkIsEnd(this.selection, this.width, this.height);
        this.selection.updateShape(checkIsEndPosition.x, checkIsEndPosition.y);
        overlayHelper.editParametrOverlap(this.shapes, this.selection);
        this.draw();
    }

    private onMouseUp() {
        if (!this.selection) {
            return;
        }

        if (this.selection.overlap) {
            this.selection.updateShape(this.startPosition.x, this.startPosition.y);
            this.selection.overlap = false;
        }
        this.shapes.forEach((shape: Shape) => {
            shape.overlap = false;
        });
        this.selection = null;
        this.draw();
    }

    private clear(): void {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    private getMouse(event: MouseEvent): Point {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: Math.round(event.clientX - rect.left),
            y: Math.round(event.clientY - rect.top)
        };
    }

    private draw(): void {
        this.clear();
        //this.snappingShape();
        this.shapes.forEach((shape: Shape) => {
            shape.overlap ? this.context.fillStyle = 'red' : this.context.fillStyle = shape.fill;
            this.context.fill(shape.path);
        });
        if (this.selection != null) {
            this.context.strokeStyle = "red";
            this.context.lineWidth = 2;
            this.context.strokeRect(this.selection.x + 1, this.selection.y + 1, this.selection.width - 2, this.selection.height - 2);
        }
    }
}