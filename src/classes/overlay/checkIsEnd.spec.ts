import checkIsEnd from './checkIsEnd';
import Shape from "../shape";

describe("Check method is End side", () => {
    it("should be ", () => {
        const shape: Shape = new Shape(100, 100, 200, 100, 'black');
        expect(checkIsEnd( shape, 100, 100 )).toBe({ x: 100, y: 100 });
    });
});