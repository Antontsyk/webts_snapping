import Shape from "../shape";
import Point from "../point";

class isEndHelper {
    public checkReturnPosition(selectionShape: Shape, widthCanvas: number, heightCanvas: number): Point {
        let newX: number = selectionShape.x;
        let newY: number = selectionShape.y;
        if (selectionShape.x <= 0) {
            newX = 0;
        } else if (selectionShape.x + selectionShape.width >= widthCanvas) {
            newX = widthCanvas - selectionShape.width;
        }

        if (selectionShape.y <= 0) {
            newY = 0;
        } else if (selectionShape.y + selectionShape.height >= heightCanvas) {
            newY = heightCanvas - selectionShape.height;
        }
        return {
            x: newX,
            y: newY
        }
    }
}

export default new isEndHelper()