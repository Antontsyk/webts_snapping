import Shape from "../../shape";
import axleCheck from "./checkAxle";
import axle from "../enums/axle";
import side from "../enums/sides";

interface checkDeltaResponse {
    response: boolean
    deltaSpace: number
}

export default function checkDeltaToShape(sideCheck, selectionShape: Shape, shape: Shape, mergeSpace: number): checkDeltaResponse {
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
        response: spaceOnShape <= mergeSpace && spaceOnShape >= 0 && axleCheck(axleThis, selectionShape, shape),
        deltaSpace: spaceOnShape
    };
}