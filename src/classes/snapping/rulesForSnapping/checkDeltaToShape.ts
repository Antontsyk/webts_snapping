import Shape from "../../shape";
import axleCheck from "./checkAxle";

interface checkDeltaResponse {
    response: boolean
    deltaSpace: number
}

export default function checkDeltaToShape(side: String, selectionShape: Shape, shape: Shape, mergeSpace: number): checkDeltaResponse {
    let spaceOnShape: number;
    switch (side) {
        case 'left':
            spaceOnShape = selectionShape.x - (shape.x + shape.width);
            return {
                response: spaceOnShape <= mergeSpace && spaceOnShape >= 0 && axleCheck('y', selectionShape, shape),
                deltaSpace: spaceOnShape
            };
        case 'right':
            spaceOnShape = shape.x - (selectionShape.x + selectionShape.width);
            return {
                response: spaceOnShape <= mergeSpace && spaceOnShape >= 0 && axleCheck('y', selectionShape, shape),
                deltaSpace: spaceOnShape
            };
        case 'top':
            spaceOnShape = selectionShape.y - (shape.y + shape.height);
            return {
                response: spaceOnShape <= mergeSpace && spaceOnShape >= 0 && axleCheck('x', selectionShape, shape),
                deltaSpace: spaceOnShape
            };
        case 'bottom':
            spaceOnShape = shape.y - (selectionShape.y + selectionShape.height);
            return {
                response: spaceOnShape <= mergeSpace && spaceOnShape >= 0 && axleCheck('x', selectionShape, shape),
                deltaSpace: spaceOnShape
            };
        default:
            return {
                response: false,
                deltaSpace: 0
            };
    }
}