import Shape from "../shape";
import Point from "../point";
import filterAndSortShapesForSnapping from "./filterShapesForSnapping"

export default (shapes: Array<Shape>, selectionShape: Shape): Point => {
    const mergeSpacing: number = 50;
    if (!selectionShape) {
        return;
    }
    selectionShape.overlap = false;
    const arrayShapesForSnapping: Array<Shape> = filterAndSortShapesForSnapping(shapes, selectionShape, mergeSpacing);
    if (arrayShapesForSnapping.length) {
        return {
            x: arrayShapesForSnapping[0].snappingParametrs.coordinatsForSnappingSelection.x,
            y: arrayShapesForSnapping[0].snappingParametrs.coordinatsForSnappingSelection.y
        }
    }
    return {
        x: selectionShape.x,
        y: selectionShape.y
    }

}



