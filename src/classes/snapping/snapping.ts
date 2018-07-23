import Shape from "../shape";
import Point from "../point";
import { head } from "lodash";
import filterAndSortShapesForSnapping from "./filterShapesForSnapping"

export default (shapes: Array<Shape>, selectionShape: Shape): Point => {
    const mergeSpacing: number = 50;

    const arrayShapesForSnapping: Array<Shape> = filterAndSortShapesForSnapping(shapes, selectionShape, mergeSpacing);

    console.log(head(arrayShapesForSnapping));

    if (head(arrayShapesForSnapping) != undefined) {
        return head(arrayShapesForSnapping).snappingParametrs.coordinatsForSnappingSelection; // first shape
    }
    return {
        x: selectionShape.x,
        y: selectionShape.y
    }

}