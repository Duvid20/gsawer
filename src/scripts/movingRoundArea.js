/*import {
  createElementWithClass,
  setCssPosition,
  setCssSize,
  getCenterCoordinatesBySelector,
} from "./functions.js";

class MovingRoundArea {
  constructor(parentSelector, radius, cssClass) {
    this.parentSelector = parentSelector;
    this.radius = radius;
    this.cssClass = cssClass;
    this.htmlElement = this.createHtmlElement();
  }

  createHtmlElement() {
    const radiusElement = createElementWithClass("div", this.cssClass);
    document.getElementById("game-container").appendChild(radiusElement);
    return radiusElement;
  }

  update() {
    const radiusDiameter = this.radius * 2;
    const newPosition = this.calcNewPosition();

    setCssSize(this.htmlElement, radiusDiameter, radiusDiameter);
    setCssPosition(this.htmlElement, newPosition.x, newPosition.y);
  }

  calcNewPosition() {
    const parentCenter = getCenterCoordinatesBySelector(this.parentSelector);
    const newPosition = {
      x: parentCenter.x - this.radius,
      y: parentCenter.y - this.radius,
    };

    return newPosition;
  }
}

export { MovingRoundArea };*/