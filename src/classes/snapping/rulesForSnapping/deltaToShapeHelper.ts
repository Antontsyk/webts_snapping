import Shape from "../../shape";
import axleHelper from "./axleHelper";
import axle from "../enums/axle";
import side from "../enums/sides";

interface checkDeltaResponse {
    response: boolean
    deltaSpace: number
}

class deltaToShapeHelper {
    public check(sideCheck, selectionShape: Shape, shape: Shape, mergeSpace: number): checkDeltaResponse {
        let spaceOnShape: number;
        let axleThis: axle;
        switch (sideCheck) {
            case side.Left:
                spaceOnShape = selectionShape.x - (shape.x + shape.width);
                axleThis = axle.Y;
                break;
            case side.Right:
                spaceOnShape = shape.x - (selectionShape.x + selectionShape.width);
                axleThis = axle.Y;
                break;
            case side.Top:
                spaceOnShape = selectionShape.y - (shape.y + shape.height);
                axleThis = axle.X;
                break;
            case side.Bottom:
                spaceOnShape = shape.y - (selectionShape.y + selectionShape.height);
                axleThis = axle.X;
                break;
            default:
                return {
                    response: false,
                    deltaSpace: 0
                };
        }
        return {
            response: spaceOnShape <= mergeSpace && spaceOnShape >= 0 && axleHelper.check(axleThis, selectionShape, shape),
            deltaSpace: spaceOnShape
        };
    }
}

export default new deltaToShapeHelper()