import Shape from "../../shape";
import axleCheck from "./checkAxle";

interface checkDeltaResponse {
    response: boolean
    deltaSpace: number
}

export default function checkDeltaToShape(side: String, selectionShape: Shape, shape: Shape, mergeSpace: number): checkDeltaResponse {
    let spaceOnShape: number;

    enum axle { X, Y };

    let axleThis: any;

    switch (side) {
        case 'left':
            spaceOnShape = selectionShape.x - (shape.x + shape.width);
            axleThis = axle.Y;
            break;
        case 'right':
            spaceOnShape = shape.x - (selectionShape.x + selectionShape.width);
            axleThis = axle.Y;
            break;
        case 'top':
            spaceOnShape = selectionShape.y - (shape.y + shape.height);
            axleThis = axle.X;
            break;
        case 'bottom':
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
        response: spaceOnShape <= mergeSpace && spaceOnShape >= 0 && axleCheck( axleThis, selectionShape, shape),
        deltaSpace: spaceOnShape
    };
}