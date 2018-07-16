import Shape from "../../shape";

export default ( side, selectionShape: Shape, shape: Shape, mergeSpace: number ): boolean => {
    switch (side){
        case "left":
            return Math.abs(selectionShape.x - shape.x) <= mergeSpace;
        case "right":
            return Math.abs((selectionShape.x + selectionShape.width) - (shape.x + shape.width)) <= mergeSpace && selectionShape.x >= 0;
        case "top":
            return Math.abs(selectionShape.y - shape.y) <= mergeSpace;
        case "bottom":
            return Math.abs((selectionShape.y + selectionShape.height) - (shape.y + shape.height)) <= mergeSpace;
        default:
            return false;
    }
}