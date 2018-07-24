import ruleOverlayHelper from "./ruleOverlayHelper";
import Shape from "../shape";

class overlayHelper {
    public editParametrOverlap(shapes: Array<Shape>, selectionShape: Shape): void  {
        selectionShape.overlap = false;
        shapes.forEach((shape: Shape) => {
            if (shape == selectionShape) {
                return;
            }
            if (ruleOverlayHelper.checkOverlay(selectionShape, shape)) {
                selectionShape.overlap = true;
                shape.overlap = true;
            } else {
                shape.overlap = false;
            }
        });
    }
}

export default new overlayHelper()