import Shape from "src/classes/shape";
import snapping from 'src/classes/snapping/snapping';

describe('snappping', () => {

    beforeEach(function () {
        this.shape =  new Shape(100, 100, 200, 200, 'black');
        this.shapes = [
            new Shape(500, 500, 200, 100, 'black'),
            new Shape(500, 500, 200, 100, 'black'),
            new Shape(500, 500, 200, 100, 'black')
        ];
    });

    it('should not snapping', function () {
        expect(snapping( this.shapes, this.shape )).toEqual({ x: 100, y: 100 });
    });
    it('should snapping', function () {
        this.shape.x = 270;
        this.shape.y = 480;
        expect(snapping( this.shapes, this.shape )).toEqual({ x: 300, y: 500 });
    });

});