import Shape from "../shape";
import Point from "../point";
import filterAndSortShapesForSnapping from "./filterShapesForSnapping"

export default (shapes: Array<Shape>, selectionShape: Shape): Point => {
    const mergeSpacing: number = 50;

    const arrayShapesForSnapping: Array<Shape> = filterAndSortShapesForSnapping(shapes, selectionShape, mergeSpacing);
    if (arrayShapesForSnapping.length) {
        return arrayShapesForSnapping[0].snappingParametrs.coordinatsForSnappingSelection;
    }
    return {
        x: selectionShape.x,
        y: selectionShape.y
    }

}



