import ruleOverlayHelper from 'src/classes/overlay/ruleOverlayHelper';
import Shape from "src/classes/shape";


describe('ruleOverlay', () =>{
    beforeEach(function () {
        this.shape1 =  new Shape(100, 100, 200, 100, 'black');
        this.shape2 = new Shape(50, 50, 200, 100, 'black');
    });

    it('should overlay', function () {
        expect( ruleOverlayHelper.checkOverlay( this.shape1, this.shape2 ) ).toBe(true);
    });
    it('should not overlay', function () {
        this.shape2.x = 100;
        this.shape2.y = 200;
        expect( ruleOverlayHelper.checkOverlay( this.shape1, this.shape2 ) ).toBe(false);
    });
});