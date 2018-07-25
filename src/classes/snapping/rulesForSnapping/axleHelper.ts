import Shape from "../../shape";
import axle from "../enums/axle";

class axleHelper {
    public check(axleCheck, selectionShape: Shape, shape: Shape): boolean {
        switch (axleCheck) {
            case axle.X:
                return selectionShape.x + selectionShape.width - shape.x >= 0 && shape.x + shape.width - selectionShape.x >= 0;
            case axle.Y:
                return selectionShape.y + selectionShape.height - shape.y >= 0 && shape.y + shape.height - selectionShape.y >= 0;
            default:
                return false;
        }
    }
}

export default new axleHelper()