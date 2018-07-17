import Shape from "../../shape";
import side from "../enums/sides"

export default (sideCheck, selectionShape: Shape, shape: Shape, mergeSpace: number): boolean => {
    switch (sideCheck) {
        case side.Left:
            return Math.abs(selectionShape.x - shape.x) <= mergeSpace;
        case side.Right:
            return Math.abs((selectionShape.x + selectionShape.width) - (shape.x + shape.width)) <= mergeSpace && selectionShape.x >= 0;
        case side.Top:
            return Math.abs(selectionShape.y - shape.y) <= mergeSpace;
        case side.Bottom:
            return Math.abs((selectionShape.y + selectionShape.height) - (shape.y + shape.height)) <= mergeSpace;
        default:
            return false;
    }
}