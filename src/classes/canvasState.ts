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
            this.draw();
        }
    }

    private onMouseMove(event: MouseEvent) {
        if (!this.selection) {
            return;
        }
        const mouse: any = this.getMouse(event);
        this.selection.updateShape(mouse.x - this.deltaMouse.x, mouse.y - this.deltaMouse.y );
        this.snappingShape();
        this.draw();
    }

    private onMouseUp() {
        if (this.selection) {
            if (this.selection.overlap) {
                this.selection.updateShape(this.startPosition.x, this.startPosition.y);
                this.selection.overlap = false;
            }
            //this.snappingShape();
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
            shape.updatePath();
            this.context.fill(shape.path);
        });
        if (this.selection != null) {
            this.context.strokeStyle = "red";
            this.context.lineWidth = 2;
            this.context.strokeRect(this.selection.x + 1, this.selection.y + 1, this.selection.width - 2, this.selection.height - 2);
        }
    }

    private snappingShape() {
        const mergeSpace: number = 40;
        this.selection.overlap = false;

        this.shapes.forEach((shape: Shape) => {
            if (shape != this.selection) {
                if (this.overlapShape(shape)) {
                    this.selection.overlap = true;
                    shape.overlap = true;
                    return;
                } else {
                    shape.overlap = false;
                }

                if (this.deltaX_Right(shape, mergeSpace)) {
                    this.selection.x = shape.x - this.selection.width; //to right to all
                    if (Math.abs((this.selection.y + this.selection.height) - (shape.y + shape.height)) <= mergeSpace) {
                        this.selection.y = shape.y + shape.height - this.selection.height; //to right to bottom
                    } else if (Math.abs(this.selection.y - shape.y) <= mergeSpace) {
                        this.selection.y = shape.y; //to right to top
                    }
                } else if (this.deltaX_Left(shape, mergeSpace)) {
                    this.selection.x = shape.x + shape.width; //to left to all
                    if (Math.abs(this.selection.y - shape.y) <= mergeSpace) {
                        this.selection.y = shape.y; //to left to top
                    } else if (Math.abs((this.selection.y + this.selection.height) - (shape.y + shape.height)) <= mergeSpace) {
                        this.selection.y = shape.y + shape.height - this.selection.height; //to left to bottom
                    }
                } else if (this.deltaY_Top(shape, mergeSpace)) {
                    this.selection.y = shape.y + shape.height; //to top all
                    if (this.inspectedSpaceForSnappingToLeft(shape, mergeSpace)) {
                        this.selection.x = shape.x; //to top to left
                        console.log('//to top to left')
                    } else if (this.inspectedSpaceForSnappingToRight( shape, mergeSpace )) {
                        this.selection.x = shape.x + (shape.width - this.selection.width); //to top to right
                        console.log('//to top to right')
                    }
                } else if (this.deltaY_Bottom(shape, mergeSpace)) {
                    this.selection.y = shape.y - this.selection.height; //to bottom all
                    if (this.inspectedSpaceForSnappingToLeft(shape, mergeSpace)) {
                        this.selection.x = shape.x; //to bottom to left
                    } else if (this.inspectedSpaceForSnappingToRight( shape, mergeSpace )) {
                        this.selection.x = shape.x + (shape.width - this.selection.width); //to bottom to right
                    }
                }
            }
        });
        this.inspectedIsEnd();
    }

    private inspectedIsEnd (){
        if (this.selection.x <= 0) {
            this.selection.x = 0;
        } else if (this.selection.x + this.selection.width >= this.width) {
            this.selection.x = this.width - this.selection.width;
        }

        if (this.selection.y <= 0) {
            this.selection.y = 0;
        } else if (this.selection.y + this.selection.height >= this.height) {
            this.selection.y = this.height - this.selection.height;
        }
    }

    private overlapShape(shape: Shape): boolean {
        return this.selection.x + this.selection.width > shape.x &&
            this.selection.x < shape.x + shape.width &&
            this.selection.y + this.selection.height > shape.y &&
            this.selection.y < shape.y + shape.height;
    }

    private inspectedSpaceForSnappingToLeft(shape: Shape, mergeSpace: number): boolean {
        return Math.abs(this.selection.x - shape.x) <= mergeSpace && this.selection.x + this.selection.width <= this.width;
    }

    private inspectedSpaceForSnappingToRight(shape: Shape, mergeSpace: number): boolean {
        return Math.abs((this.selection.x + this.selection.width) - (shape.x + shape.width)) <= mergeSpace && this.selection.x >= 0;
    }

    private deltaX_All(shape: Shape): boolean {
        return this.selection.x + this.selection.width - shape.x >= 0 && shape.x + shape.width - this.selection.x >= 0
    }

    private delteY_All(shape: Shape): boolean {
        return this.selection.y + this.selection.height - shape.y >= 0 && shape.y + shape.height - this.selection.y >= 0
    }

    private deltaX_Left(shape: Shape, mergeSpace: number): boolean {
        const spaceOnShape: number = this.selection.x - (shape.x + shape.width);
        return spaceOnShape <= mergeSpace && spaceOnShape >= 0 && this.delteY_All(shape);
    }

    private deltaX_Right(shape: Shape, mergeSpace: number): boolean {
        const spaceOnShapes: number = shape.x - (this.selection.x + this.selection.width);
        return spaceOnShapes <= mergeSpace && spaceOnShapes >= 0 && this.delteY_All(shape);
    }

    private deltaY_Top(shape: Shape, mergeSpace: number): boolean {
        const spaceOnShape: number = this.selection.y - (shape.y + shape.height);
        return spaceOnShape <= mergeSpace && spaceOnShape >= 0 && this.deltaX_All(shape);
    }

    private deltaY_Bottom(shape: Shape, mergeSpace: number): boolean {
        const spaceOnShape: number = shape.y - (this.selection.y + this.selection.height);
        return spaceOnShape <= mergeSpace && spaceOnShape >= 0 && this.deltaX_All(shape);
    }

}