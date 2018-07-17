import ruleOverlay from "./ruleOverlay";
import Shape from "../shape";

export default (shapes: Array<Shape>, selectionShape: Shape): void => {
    selectionShape.overlap = false;
    shapes.forEach((shape: Shape) => {
        if (shape == selectionShape) {
            return;
        }
        if (ruleOverlay(selectionShape, shape)) {
            selectionShape.overlap = true;
            shape.overlap = true;
        } else {
            shape.overlap = false;
        }
    });
}