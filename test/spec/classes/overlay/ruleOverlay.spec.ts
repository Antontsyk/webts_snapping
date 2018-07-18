import ruleOverlay from '../../../../src/classes/overlay/ruleOverlay';
import Shape from "../../../../src/classes/shape";


describe('ruleOverlay', () =>{
    beforeEach(function () {
        this.shape1 =  new Shape(100, 100, 200, 100, 'black');
        this.shape2 = new Shape(50, 50, 200, 100, 'black');
    });

    it('should overlay', function () {
        expect( ruleOverlay( this.shape1, this.shape2 ) ).toBe(true);
    });
    it('should not overlay', function () {
        this.shape2.x = 100;
        this.shape2.y = 200;
        expect( ruleOverlay( this.shape1, this.shape2 ) ).toBe(false);
    });
});