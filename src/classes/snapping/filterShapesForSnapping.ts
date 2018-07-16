import ruleOverlay from "../overlay/ruleOverlay";
import Shape from "../shape";
import checkMergeSpaceToSide from "./rulesForSnapping/checkMergeSpaceToSide"
import checkDeltaToShape from "./rulesForSnapping/checkDeltaToShape"

export default (shapes: Array<Shape>, selectionShape: Shape, mergeSpace: number): Array<Shape> => {
    return shapes.filter((shape: Shape) => {
        if (shape == selectionShape || ruleOverlay(selectionShape, shape)) {
            return false;
        }

        const checkDeltaToShapeRight = checkDeltaToShape('right', selectionShape, shape, mergeSpace);
        if (checkDeltaToShapeRight.response) {
            shape.snappingParametrs.deltaSnappingWithSelection = checkDeltaToShapeRight.deltaSpace;
            shape.snappingParametrs.coordinatsForSnappingSelection.x = shape.x - selectionShape.width; //to right to all
            shape.snappingParametrs.coordinatsForSnappingSelection.y = selectionShape.y;
            if (checkMergeSpaceToSide('top', selectionShape, shape, mergeSpace)) {
                shape.snappingParametrs.coordinatsForSnappingSelection.y = shape.y; //to right to top
            } else if (checkMergeSpaceToSide('bottom', selectionShape, shape, mergeSpace)) {
                shape.snappingParametrs.coordinatsForSnappingSelection.y = shape.y + shape.height - selectionShape.height; //to right to bottom
            }
            return true
        }
        const checkDeltaToShapeLeft = checkDeltaToShape('left', selectionShape, shape, mergeSpace);
        if (checkDeltaToShapeLeft.response) {
            shape.snappingParametrs.deltaSnappingWithSelection = checkDeltaToShapeLeft.deltaSpace;
            shape.snappingParametrs.coordinatsForSnappingSelection.x = shape.x + shape.width; //to left to all
            shape.snappingParametrs.coordinatsForSnappingSelection.y = selectionShape.y;
            if (checkMergeSpaceToSide('top', selectionShape, shape, mergeSpace)) {
                shape.snappingParametrs.coordinatsForSnappingSelection.y = shape.y; //to left to top
            } else if (checkMergeSpaceToSide('bottom', selectionShape, shape, mergeSpace)) {
                shape.snappingParametrs.coordinatsForSnappingSelection.y = shape.y + shape.height - selectionShape.height; //to left to bottom
            }
            return true
        }
        const checkDeltaToShapeTop = checkDeltaToShape('top', selectionShape, shape, mergeSpace);
        if (checkDeltaToShapeTop.response) {
            shape.snappingParametrs.deltaSnappingWithSelection = checkDeltaToShapeTop.deltaSpace;
            shape.snappingParametrs.coordinatsForSnappingSelection.y = shape.y + shape.height; //to top all
            shape.snappingParametrs.coordinatsForSnappingSelection.x = selectionShape.x;
            if (checkMergeSpaceToSide('left', selectionShape, shape, mergeSpace)) {
                shape.snappingParametrs.coordinatsForSnappingSelection.x = shape.x; //to top to left
            } else if (checkMergeSpaceToSide('right', selectionShape, shape, mergeSpace)) {
                shape.snappingParametrs.coordinatsForSnappingSelection.x = shape.x + (shape.width - selectionShape.width); //to top to right
            }
            return true
        }
        const checkDeltaToShapeBottom = checkDeltaToShape('bottom', selectionShape, shape, mergeSpace);
        if (checkDeltaToShapeBottom.response) {
            shape.snappingParametrs.deltaSnappingWithSelection = checkDeltaToShapeBottom.deltaSpace;
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