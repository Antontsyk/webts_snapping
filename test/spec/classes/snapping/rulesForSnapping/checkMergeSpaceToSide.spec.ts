import checkMergeSpaceToSide from 'src/classes/snapping/rulesForSnapping/checkMergeSpaceToSide';
import Shape from "src/classes/shape";
import side from "src/classes/snapping/enums/sides";

describe('Space > 0 and space < mergeSpace ', () => {
    beforeEach(function () {
       this.mergeSpace = 40;
       this.otherShape = new Shape(100, 100, 300, 200, 'black');
       this.selectionShape = new Shape(301, 120, 100, 100, 'black');
    });
    
    it('check to top', function () {
        expect(checkMergeSpaceToSide(side.Top, this.selectionShape, this.otherShape, this.mergeSpace)).toBe(true);
    });
    it('not check to top', function () {
        this.selectionShape.y = 141;
        expect(checkMergeSpaceToSide(side.Top, this.selectionShape, this.otherShape, this.mergeSpace)).toBe(false);
    });


    it('check to bottom', function () {
        this.selectionShape.y = 161;
        expect(checkMergeSpaceToSide(side.Bottom, this.selectionShape, this.otherShape, this.mergeSpace)).toBe(true);
    });
    it('not check to bottom', function () {
        this.selectionShape.y = 241;
        expect(checkMergeSpaceToSide(side.Bottom, this.selectionShape, this.otherShape, this.mergeSpace)).toBe(false);
    });


    it('check to left', function () {
        this.selectionShape.x = 60;
        this.selectionShape.y = 320;
        expect(checkMergeSpaceToSide(side.Left, this.selectionShape, this.otherShape, this.mergeSpace)).toBe(true);
    });
    it('not check to left', function () {
        this.selectionShape.x = 59;
        this.selectionShape.y = 320;
        expect(checkMergeSpaceToSide(side.Left, this.selectionShape, this.otherShape, this.mergeSpace)).toBe(false);
    });



    it('check to right', function () {
        this.selectionShape.x = 260;
        this.selectionShape.y = 320;
        expect(checkMergeSpaceToSide(side.Right, this.selectionShape, this.otherShape, this.mergeSpace)).toBe(true);
    });
    it('not check to right', function () {
        this.selectionShape.x = 341;
        this.selectionShape.y = 320;
        expect(checkMergeSpaceToSide(side.Right, this.selectionShape, this.otherShape, this.mergeSpace)).toBe(false);
    });
    
});