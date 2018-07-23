import Shape from "src/classes/shape";
import filterShapesForSnapping from 'src/classes/snapping/filterShapesForSnapping';

describe('filter Shapes For Snapping', () => {

    beforeEach(function () {
        this.shape = new Shape(100, 100, 200, 200, 'black');
        this.shapes = [
            new Shape(320, 130, 200, 100, 'black'),
            new Shape(500, 500, 200, 100, 'black'),
            new Shape(500, 500, 200, 100, 'black')
        ];
    });

    it('should return shape', function () {
        expect(filterShapesForSnapping(this.shapes, this.shape, 40)).toContain(this.shapes[0]);
    });

    it('should not return shape', function () {
        this.shape.y = 700;
        expect(filterShapesForSnapping(this.shapes, this.shape, 40)).toEqual([]);
    });
});