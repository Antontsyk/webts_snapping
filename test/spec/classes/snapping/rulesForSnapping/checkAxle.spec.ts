import checkAxle from '../../../../../src/classes/snapping/rulesForSnapping/checkAxle';
import Shape from "../../../../../src/classes/shape";
import axle from "../../../../../src/classes/snapping/enums/axle";

describe('check axles if selection shaepe near other shape', () =>{
    const selectionShape = new Shape(100, 100, 200, 100, 'black');

    it('selection shape near by axleX have shapes', function () {
        const otherShape = new Shape(100, 100, 200, 100, 'black');
        expect( checkAxle( axle.X, selectionShape, otherShape ) ).toBe(true);
    });
    it('selection shape near by axleX have not shapes', function () {
        const otherShape = new Shape(301, 100, 200, 100, 'black');
        expect( checkAxle( axle.X, selectionShape, otherShape ) ).toBe(false);
    });
    it('selection shape near by axleY have shapes', function () {
        const otherShape = new Shape(100, 150, 200, 100, 'black');
        expect( checkAxle( axle.Y, selectionShape, otherShape ) ).toBe(true);
    });
    it('selection shape near by axleY have not shapes', function () {
        const otherShape = new Shape(301, 201, 200, 100, 'black');
        expect( checkAxle( axle.Y, selectionShape, otherShape ) ).toBe(false);
    });
});