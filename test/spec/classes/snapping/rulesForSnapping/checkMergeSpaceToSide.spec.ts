import checkMergeSpaceToSide from '../../../../../src/classes/snapping/rulesForSnapping/checkMergeSpaceToSide';
import Shape from "../../../../../src/classes/shape";
import side from "../../../../../src/classes/snapping/enums/sides";

describe('check merge space between selection shape and other shape', () => {
    const mergeSpace = 40;
    let selectionShape;
    const otherShape = new Shape(100, 100, 300, 200, 'black');

    it(' --- check space to top', function () {
        selectionShape = new Shape(301, 120, 100, 100, 'black');
        expect(checkMergeSpaceToSide(side.Top, selectionShape, otherShape, mergeSpace)).toBe(true);
    });
    it(' ---not check space to top', function () {
        selectionShape = new Shape(301, 141, 100, 100, 'black');
        expect(checkMergeSpaceToSide(side.Top, selectionShape, otherShape, mergeSpace)).toBe(false);
    });



    it(' --- check space to bottom', function () {
        selectionShape = new Shape(301, 161, 100, 100, 'black');
        expect(checkMergeSpaceToSide(side.Bottom, selectionShape, otherShape, mergeSpace)).toBe(true);
    });
    it(' ---not check space to bottom', function () {
        selectionShape = new Shape(301, 241, 100, 100, 'black');
        expect(checkMergeSpaceToSide(side.Bottom, selectionShape, otherShape, mergeSpace)).toBe(false);
    });



    it(' --- check space to left', function () {
        selectionShape = new Shape(60, 320, 100, 100, 'black');
        expect(checkMergeSpaceToSide(side.Left, selectionShape, otherShape, mergeSpace)).toBe(true);
    });
    it(' ---not check space to left', function () {
        selectionShape = new Shape(59, 320, 100, 100, 'black');
        expect(checkMergeSpaceToSide(side.Left, selectionShape, otherShape, mergeSpace)).toBe(false);
    });



    it(' --- check space to right', function () {
        selectionShape = new Shape(260, 320, 100, 100, 'black');
        expect(checkMergeSpaceToSide(side.Right, selectionShape, otherShape, mergeSpace)).toBe(true);
    });
    it(' ---not check space to right', function () {
        selectionShape = new Shape(341, 320, 100, 100, 'black');
        expect(checkMergeSpaceToSide(side.Right, selectionShape, otherShape, mergeSpace)).toBe(false);
    });




});