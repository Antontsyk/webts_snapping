import Shape from "src/classes/shape";
import overlayHelper from "src/classes/overlay/overlayHelper";
import inject from 'inject-loader!src/classes/overlay/overlayHelper';


describe('checkOverlay', function() {

    beforeEach(function () {
        this.overlayRuleHelper = jasmine.createSpyObj('ruleOverlayHelper', ['checkOverlay']);

        this.overlayHelper = inject({
            './ruleOverlayHelper': this.overlayRuleHelper
        });


        this.shape =  new Shape(100, 100, 200, 200, 'black');
        this.shapes = [
            new Shape(50, 50, 200, 100, 'black'),
            new Shape(50, 50, 200, 100, 'black'),
            new Shape(50, 50, 200, 100, 'black')
        ];
    });

    it('should change paramert overlay = true in shape', function () {
        this.overlayRuleHelper.checkOverlay.and.returnValue(true);
        overlayHelper.editParametrOverlap(this.shapes, this.shapes);
        expect(this.shapes[0].overlap).toBe(false);
    });

});