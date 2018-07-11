export default class Shape {

    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public fill: string;
    public path: any;
    public active: boolean = false;
    public overlap: boolean = false;

    constructor( x: number, y: number, width: number, height: number, fill: string ){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.fill = fill || '#AAAAAA';
        this.updatePath();
    }

    public updatePath(): void {
        let path: any = new Path2D();
        path.rect( this.x, this.y, this.width, this.height );
        /*this.overlap ? path.fillStyle = 'red' : path.fillStyle = this.fill;*/
        this.path = path;
    }

    public updateShape( x: number, y:number ): void {
        this.x = x;
        this.y = y;
        this.updatePath();
    }
}