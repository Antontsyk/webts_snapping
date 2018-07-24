import Point from "./point";

interface SnappingParametrs {
    deltaSnappingWithSelection: number,
    coordinatsForSnappingSelection: Point;
}

export default class Shape {
    public fill: string;
    public path: any;
    public overlap: boolean = false;
    public snappingParametrs: SnappingParametrs = {
        deltaSnappingWithSelection: 0,
        coordinatsForSnappingSelection: {
            x: 0,
            y: 0
        }
    };

    constructor(public x: number, public y: number, public width: number, public height: number, fill: string) {
        this.fill = fill || '#AAAAAA';
        this.updatePath();
    }

    public updatePath(): void {
        let path: any = new Path2D();
        path.rect(this.x, this.y, this.width, this.height);
        /*this.overlap ? path.fillStyle = 'red' : path.fillStyle = this.fill;*/
        this.path = path;
    }

    public updateShape(x: number, y: number): void {
        this.x = x;
        this.y = y;
        this.updatePath();
    }
}
