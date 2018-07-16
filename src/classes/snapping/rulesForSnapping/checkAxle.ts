import Shape from "../../shape";

export default function axleCheck( axle: String, selectionShape: Shape, shape: Shape ): boolean {
    switch (axle){
        case 'x':
            return selectionShape.x + selectionShape.width - shape.x >= 0 && shape.x + shape.width - selectionShape.x >= 0;
        case 'y':
            return selectionShape.y + selectionShape.height - shape.y >= 0 && shape.y + shape.height - selectionShape.y >= 0;
        default:
            return false;
    }
}