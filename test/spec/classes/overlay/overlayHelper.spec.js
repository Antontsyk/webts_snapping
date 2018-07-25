import Shape from "src/classes/shape";
import inject from 'inject-loader!src/classes/overlay/overlayHelper';


describe('checkOverlay', function() {

    beforeEach(function () {
        this.overlayRuleHelper = jasmine.createSpyObj('ruleOverlayHelper', ['checkOverlay']);

        this.overlayHelper = inject({
            './ruleOverlayHelper': this.overlayRuleHelper
        }).default;



        this.shape =  new Shape(100, 100, 200, 200, 'black');
        this.shapes = [
            new Shape(50, 50, 200, 100, 'black'),
            new Shape(50, 50, 200, 100, 'black'),
            new Shape(50, 50, 200, 100, 'black')
        ];
    });

    it('should change paramert overlay = true in shape', function () {
        this.overlayRuleHelper.checkOverlay.and.returnValue(true);
        this.overlayHelper.editParametrOverlap(this.shapes, this.shape);
        expect(this.shapes[0].overlap).toBe(true);
        expect(this.shapes[1].overlap).toBe(true);
        expect(this.shapes[2].overlap).toBe(true);
        expect(this.shape.overlap).toBe(true);
    });


    it('should not change paramert overlay', function () {
        this.overlayRuleHelper.checkOverlay.and.returnValue(false);

        this.overlayHelper.editParametrOverlap(this.shapes, this.shape);
        expect(this.shapes[0].overlap).toBe(false);
        expect(this.shapes[1].overlap).toBe(false);
        expect(this.shapes[2].overlap).toBe(false);
        expect(this.shape.overlap).toBe(false);
    });

});