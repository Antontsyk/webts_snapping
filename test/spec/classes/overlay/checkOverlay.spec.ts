import Shape from "src/classes/shape";
import checkOverlay from "src/classes/overlay/checkOverlay";

/*import {
    checkOverlay,
    ilOverwriteruleOverlay,
    ilResetAll
} from 'import-inject-loader?ruleOverlay!src/classes/overlay/checkOverlay';*/


//const inject = require('import-inject-loader?ruleOverlay!src/classes/overlay/checkOverlay');

describe('checkOverlay', () => {

    beforeEach(function () {
        this.shape =  new Shape(100, 100, 200, 200, 'black');
        this.shapes = [
            new Shape(50, 50, 200, 100, 'black'),
            new Shape(50, 50, 200, 100, 'black'),
            new Shape(50, 50, 200, 100, 'black')
        ];
    });

    it('should change paramert overlay = true in shape', function () {
        //ilOverwriteRuleOverlay(true);
        checkOverlay( this.shapes, this.shape )

        expect(this.shapes[0].overlap).toBe(true);
        expect(this.shapes[1].overlap).toBe(true);
        expect(this.shapes[2].overlap).toBe(true);
    });

    it('should not change paramert overlay', function () {
        //ilOverwriteRuleOverlay(true);
        this.shape.x = 300;
        this.shape.y = 300;
        checkOverlay( this.shapes, this.shape )

        expect(this.shapes[0].overlap).toBe(false);
        expect(this.shapes[1].overlap).toBe(false);
        expect(this.shapes[2].overlap).toBe(false);
    });
    //afterEach(ilResetAll);

});