import Shape from 'src/classes/shape';
import checkIsEnd from 'src/classes/overlay/checkIsEnd';

describe("Check is end window", () => {
    beforeEach(function () {
        this.height = 100;
        this.width = 200;
        this.widthCanvas = 1000;
        this.heightCanvas = 1000;
        this.shape = new Shape(100, 100, this.width, this.height, 'black');
    });

    it("no changes", function() {
        expect(checkIsEnd( this.shape, this.widthCanvas, this.heightCanvas ) ).toEqual({ x:100, y: 100});
    });

    it("if got out for left part window", function() {
        this.shape.x = -100;
        this.shape.y = 100;
        expect(checkIsEnd( this.shape, this.widthCanvas, this.heightCanvas ) ).toEqual({ x:0, y: 100});
    });

    it("if got out for right part window", function() {
        this.shape.x = 900;
        this.shape.y = 100;
        expect(checkIsEnd( this.shape, this.widthCanvas, this.heightCanvas ) ).toEqual({ x:800, y: 100});
    });
    it("if got out for top part window", function() {
        this.shape.x = 100;
        this.shape.y = -100;
        expect(checkIsEnd( this.shape, this.widthCanvas, this.heightCanvas ) ).toEqual({ x:100, y: 0});
    });
    it("if got out for bottom part window", function() {
        this.shape.x = 100;
        this.shape.y = 990;
        expect(checkIsEnd( this.shape, this.widthCanvas, this.heightCanvas ) ).toEqual({ x:100, y: 900});
    });
});