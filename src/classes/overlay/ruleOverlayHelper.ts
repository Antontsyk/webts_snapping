import Shape from "../shape";

class ruleOverlayHelper {
    public checkOverlay(selectionShape: Shape, shape: Shape): boolean {
        return selectionShape.x + selectionShape.width > shape.x &&
            selectionShape.x < shape.x + shape.width &&
            selectionShape.y + selectionShape.height > shape.y &&
            selectionShape.y < shape.y + shape.height;
    }
}

export default new ruleOverlayHelper();

