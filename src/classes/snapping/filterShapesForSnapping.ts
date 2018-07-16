import ruleOverlay from "../overlay/ruleOverlay";
import Shape from "../shape";
import checkMergeSpaceToSide from "./rulesForSnapping/checkMergeSpaceToSide"
import checkDeltaToShape from "./rulesForSnapping/checkDeltaToShape"

export default (shapes: Array<Shape>, selectionShape: Shape, mergeSpace: number): Array<Shape> => {
    return shapes.filter((shape: Shape) => {
        if (shape == selectionShape || ruleOverlay(selectionShape, shape)) {
            return false;
        }

        if (checkDeltaToShape('right', selectionShape, shape, mergeSpace).response) {
            shape.snappingParametrs.deltaSnappingWithSelection = checkDeltaToShape('right', selectionShape, shape, mergeSpace).deltaSpace;
            shape.snappingParametrs.coordinatsForSnappingSelection.x = shape.x - selectionShape.width; //to right to all
            shape.snappingParametrs.coordinatsForSnappingSelection.y = selectionShape.y;
            if (checkMergeSpaceToSide('top', selectionShape, shape, mergeSpace)) {
                shape.snappingParametrs.coordinatsForSnappingSelection.y = shape.y; //to right to top
            } else if (checkMergeSpaceToSide('bottom', selectionShape, shape, mergeSpace)) {
                shape.snappingParametrs.coordinatsForSnappingSelection.y = shape.y + shape.height - selectionShape.height; //to right to bottom
            }
            return true
        }
        if (checkDeltaToShape('left', selectionShape, shape, mergeSpace).response) {
            shape.snappingParametrs.deltaSnappingWithSelection = checkDeltaToShape('left', selectionShape, shape, mergeSpace).deltaSpace;
            shape.snappingParametrs.coordinatsForSnappingSelection.x = shape.x + shape.width; //to left to all
            shape.snappingParametrs.coordinatsForSnappingSelection.y = selectionShape.y;
            if (checkMergeSpaceToSide('top', selectionShape, shape, mergeSpace)) {
                shape.snappingParametrs.coordinatsForSnappingSelection.y = shape.y; //to left to top
            } else if (checkMergeSpaceToSide('bottom', selectionShape, shape, mergeSpace)) {
                shape.snappingParametrs.coordinatsForSnappingSelection.y = shape.y + shape.height - selectionShape.height; //to left to bottom
            }
            return true
        }
        if (checkDeltaToShape('top', selectionShape, shape, mergeSpace).response) {
            shape.snappingParametrs.deltaSnappingWithSelection = checkDeltaToShape('top', selectionShape, shape, mergeSpace).deltaSpace;
            shape.snappingParametrs.coordinatsForSnappingSelection.y = shape.y + shape.height; //to top all
            shape.snappingParametrs.coordinatsForSnappingSelection.x = selectionShape.x;
            if (checkMergeSpaceToSide('left', selectionShape, shape, mergeSpace)) {
                shape.snappingParametrs.coordinatsForSnappingSelection.x = shape.x; //to top to left
            } else if (checkMergeSpaceToSide('right', selectionShape, shape, mergeSpace)) {
                shape.snappingParametrs.coordinatsForSnappingSelection.x = shape.x + (shape.width - selectionShape.width); //to top to right
            }
            return true
        }
        if (checkDeltaToShape('bottom', selectionShape, shape, mergeSpace).response) {
            shape.snappingParametrs.deltaSnappingWithSelection = checkDeltaToShape('bottom', selectionShape, shape, mergeSpace).deltaSpace;
            shape.snappingParametrs.coordinatsForSnappingSelection.y = shape.y - selectionShape.height; //to bottom all
            shape.snappingParametrs.coordinatsForSnappingSelection.x = selectionShape.x;
            if (checkMergeSpaceToSide('left', selectionShape, shape, mergeSpace)) {
                shape.snappingParametrs.coordinatsForSnappingSelection.x = shape.x; //to bottom to left
            } else if (checkMergeSpaceToSide('right', selectionShape, shape, mergeSpace)) {
                shape.snappingParametrs.coordinatsForSnappingSelection.x = shape.x + (shape.width - selectionShape.width); //to bottom to right
            }
            return true
        }
    }).sort((a: Shape, b: Shape) => {
        if (a.snappingParametrs.deltaSnappingWithSelection < b.snappingParametrs.deltaSnappingWithSelection) {
            return -1;
        }
        if (a.snappingParametrs.deltaSnappingWithSelection >= b.snappingParametrs.deltaSnappingWithSelection) {
            return 1;
        }
        return 0;
    });
}