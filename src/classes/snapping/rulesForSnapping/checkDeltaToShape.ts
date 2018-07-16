import Shape from "../../shape";
import axleCheck from "./checkAxle";

interface checkDeltaResponse {
    response: boolean
    deltaSpace: number
}

export default function checkDeltaToShape(side: String, selectionShape: Shape, shape: Shape, mergeSpace: number): checkDeltaResponse {
    let spaceOnShape: number;

    enum axle { x = 'x', y = 'y' };

    let axleThis: axle;

    switch (side) {
        case 'left':
            spaceOnShape = selectionShape.x - (shape.x + shape.width);
            axleThis = axle.y;
            break;
        case 'right':
            spaceOnShape = shape.x - (selectionShape.x + selectionShape.width);
            axleThis = axle.y;
            break;
        case 'top':
            spaceOnShape = selectionShape.y - (shape.y + shape.height);
            axleThis = axle.x;
            break;
        case 'bottom':
            spaceOnShape = shape.y - (selectionShape.y + selectionShape.height);
            axleThis = axle.x;
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