import checkAxle from 'src/classes/snapping/rulesForSnapping/checkAxle';
import Shape from "src/classes/shape";
import axle from "src/classes/snapping/enums/axle";

describe('check shape near selection Shape', () =>{
    beforeEach(function () {
        this.selectionShape = new Shape(100, 100, 200, 100, 'black');
        this.otherShape = new Shape(100, 100, 200, 100, 'black');
    });
    

    it('by axleX', function () {
        expect( checkAxle( axle.X, this.selectionShape, this.otherShape) ).toBe(true);
    });
    it('not by axleX', function () {
        this.otherShape.x = 301;
        this.otherShape.y = 100;
        expect( checkAxle( axle.X, this.selectionShape, this.otherShape) ).toBe(false);
    });
    it('by axleY', function () {
        this.otherShape.x = 100;
        this.otherShape.y = 150;
        expect( checkAxle( axle.Y, this.selectionShape, this.otherShape) ).toBe(true);
    });
    it('not by axleY', function () {
        this.otherShape.x = 301;
        this.otherShape.y = 201;
        expect( checkAxle( axle.Y, this.selectionShape, this.otherShape) ).toBe(false);
    });
});