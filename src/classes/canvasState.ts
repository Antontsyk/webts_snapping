import Point from "./point";
import Shape from "./shape";

export default class CanvasState {
    private canvas: HTMLElement;
    private width: number;
    private height: number;
    private context: any;
    private shapes: Array<Shape> = [];
    private selection: Shape = null;
    private deltaMouse: Point = { x: 0, y: 0 };

    constructor ( canvas: any, shapes: Array<any> ) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = canvas.getContext('2d');
        this.shapes = shapes;
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this), true);
        /*this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this), true);
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this), true);*/
        this.draw();
    }

    private onMouseDown ( event: MouseEvent ) {
        const mouse: any = this.getMouse( event );
        const mx: number = mouse.x;
        const my: number = mouse.y;
        this.deltaMouse = { x: -mx, y: -my };
        this.selection = this.shapes.find( ( shape: Shape ) => {
            return this.context.isPointInPath( shape.path, mx, my )
        });

        if (this.selection) {
            console.log( this.selection );
            this.draw();
        }
    }

    /*private onMouseMove ( event: MouseEvent ) {
        if (!this.selection) {
            return;
        }

        const mouse: any = this.getMouse( event );
        const deltaX: number = this.deltaMouse.x + mouse.x;
        const deltaY: number = this.deltaMouse.y + mouse.y;
        this.deltaMouse = { x: -mouse.x, y: -mouse.y };
        this.selection.updatePolygon( deltaX, deltaY );
        this.intersectionPolygon();
        this.draw();
    }

    private onMouseUp (){
        this.selection = null;
        this.draw();
    }*/

    private clear (): void {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    private getMouse ( event: MouseEvent ): object {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: Math.round(event.clientX - rect.left),
            y: Math.round(event.clientY - rect.top)
        };
    }

    private draw (): void {
        this.clear();
        this.shapes.forEach(( shape: Shape, index: number ) => {
            this.context.fillStyle = shape.fill;
            this.context.fill(shape.path);
        });
    }

    /*private intersectionPolygon () {

        let indexSelectionElement: number = this.polygons.indexOf( this.selection );

        this.polygons.forEach((polygon: Shape, index: number ) => {

            if (polygon == this.selection) {
                return;
            }

            let isInterSelection: boolean = this.selection.way.some(( way: Point ) => {
               return this.context.isPointInPath( polygon.path, way.x, way.y );
            });

            let isInterPolygon: boolean = polygon.way.some( ( way: Point ) => {
                return this.context.isPointInPath( this.selection.path, way.x, way.y );
            });

            if( isInterPolygon || isInterSelection ){
                if( this.selection.intersection.indexOf( index ) == -1 ){
                    this.selection.intersection.push(index)
                }
                if( polygon.intersection.indexOf( indexSelectionElement ) == -1 ){
                    polygon.intersection.push( indexSelectionElement );
                }
            } else {
                if( this.selection.intersection.indexOf( index ) != -1 ){
                    this.selection.intersection.splice( this.selection.intersection.indexOf( index ) , 1 );
                }
                if( polygon.intersection.indexOf( indexSelectionElement ) != -1 ){
                    polygon.intersection.splice( polygon.intersection.indexOf( indexSelectionElement ) , 1 );
                }
            }

        });
    }*/

}