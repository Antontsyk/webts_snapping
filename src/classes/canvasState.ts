import Point from "./point";
import Shape from "./shape";

export default class CanvasState {
    private canvas: HTMLElement;
    private width: number;
    private height: number;
    private context: any;
    private shapes: Array<Shape> = [];
    private selection: Shape = null;
    private deltaMouse: Point = {x: 0, y: 0};
    private startPosition: Point = {x: 0, y: 0};

    constructor(canvas: any, shapes: Array<any>) {
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
            this.selection.active = true;
            this.draw();
        }
    }

    private onMouseMove(event: MouseEvent) {
        if (!this.selection) {
            return;
        }

        const mouse: any = this.getMouse(event);
        let newX: number = mouse.x - this.deltaMouse.x;
        let newY: number = mouse.y - this.deltaMouse.y;

        if (newX <= 0) {
            newX = 0;
        } else if (newX + this.selection.width >= this.width) {
            newX = this.width - this.selection.width;
        }

        if (newY <= 0) {
            newY = 0;
        } else if (newY + this.selection.height >= this.height) {
            newY = this.height - this.selection.height;
        }

        this.selection.updateShape(newX, newY);
        this.snappingShape();
        this.draw();
    }

    private onMouseUp() {
        if (this.selection) {
            if (this.selection.overlap) {
                this.selection.updateShape(this.startPosition.x, this.startPosition.y);
                this.selection.overlap = false;
            }
            this.snappingShape();
            this.selection.active = false;
            this.selection = null;
            this.draw();
        }
    }

    private clear(): void {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    private getMouse(event: MouseEvent): object {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: Math.round(event.clientX - rect.left),
            y: Math.round(event.clientY - rect.top)
        };
    }

    private draw(): void {
        this.clear();
        this.shapes.forEach((shape: Shape) => {
            shape.overlap ? this.context.fillStyle = 'red' : this.context.fillStyle = shape.fill;
            this.context.fill(shape.path);
        });
        if (this.selection != null) {
            this.context.strokeStyle = "red";
            this.context.lineWidth = 2;
            this.context.strokeRect( this.selection.x + 1, this.selection.y + 1, this.selection.width - 2, this.selection.height - 2 );
        }
    }

    private snappingShape() {
        const mergeSpace: number = 10;
        const X: number = this.selection.x;
        const Y: number = this.selection.y;
        const W: number = this.selection.width;
        const H: number = this.selection.height;
        this.selection.overlap = false;
        this.shapes.forEach((shape: Shape) => {
            if (shape != this.selection) {
                if (X + W > shape.x &&
                    X < shape.x + shape.width &&
                    Y + H > shape.y &&
                    Y < shape.y + shape.height) {
                    this.selection.overlap = true;
                    shape.overlap = true;
                    return;
                } else {
                    shape.overlap = false;
                }

                if (shape.x - (X + W) <= mergeSpace && shape.x - (X + W) >= 0 && Math.abs(Y - shape.y) <= mergeSpace) {
                    this.selection.x = shape.x - W;
                    this.selection.y = shape.y;
                    console.log('to right to top');
                } else if (shape.x - (X + W) <= mergeSpace && shape.x - (X + W) >= 0 && Math.abs((Y + H) - (shape.y + shape.height)) <= mergeSpace) {
                    this.selection.x = shape.x - W;
                    this.selection.y = shape.y + shape.height - H;
                    console.log('to right to bottom');
                } else if ((X - (shape.x + shape.width)) <= mergeSpace && (X - (shape.x + shape.width)) >= 0 && Math.abs(Y - shape.y) <= mergeSpace) {
                    this.selection.x = shape.x + shape.width;
                    this.selection.y = shape.y;
                    console.log('to left to top');
                } else if ((X - (shape.x + shape.width)) <= mergeSpace && (X - (shape.x + shape.width)) >= 0 && Math.abs((Y + H) - (shape.y + shape.height)) <= mergeSpace) {
                    this.selection.x = shape.x + shape.width;
                    this.selection.y = shape.y + shape.height - H;
                    console.log('to left to bottom');
                } else if (shape.y - (Y + H) <= mergeSpace && shape.y - (Y + H) >= 0 && Math.abs(X - shape.x) <= mergeSpace) {
                    this.selection.x = shape.x;
                    this.selection.y = shape.y - H;
                    console.log('to bottom to left');
                } else if (shape.y - (Y + H) <= mergeSpace && shape.y - (Y + H) >= 0 && Math.abs((X + W) - (shape.x + shape.width)) <= mergeSpace) {
                    this.selection.x = shape.x + (shape.width - W);
                    this.selection.y = shape.y - H;
                    console.log('to bottom to right');
                } else if (Y - (shape.y + shape.height) <= mergeSpace && Y - (shape.y + shape.height) >= 0 && Math.abs(X - shape.x) <= mergeSpace) {
                    this.selection.x = shape.x;
                    this.selection.y = shape.y + shape.height;
                    console.log('to top to left');
                } else if (Y - (shape.y + shape.height) <= mergeSpace && Y - (shape.y + shape.height) >= 0 && Math.abs((X + W) - (shape.x + shape.width)) <= mergeSpace) {
                    this.selection.x = shape.x + (shape.width - W);
                    this.selection.y = shape.y + shape.height;
                    console.log('to top to right');
                } else if (Y - (shape.y + shape.height) <= mergeSpace && Y - (shape.y + shape.height) >= 0) {
                    this.selection.y = shape.y + shape.height;
                    console.log('to top all');
                } else if (shape.y - (Y + H) <= mergeSpace && shape.y - (Y + H) >= 0) {
                    this.selection.y = shape.y - H;
                    console.log('to bottom all');
                } else if ((X - (shape.x + shape.width)) <= mergeSpace && (X - (shape.x + shape.width)) >= 0) {
                    this.selection.x = shape.x + shape.width;
                    console.log('to left all');
                } else if (shape.x - (X + W) <= mergeSpace && shape.x - (X + W) >= 0) {
                    this.selection.x = shape.x - W;
                    console.log('to right all');
                }
                this.selection.updatePath()
                this.draw();
            }
        })
    }
}