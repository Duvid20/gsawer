import {
  createElementWithClass,
  getCssPosition,
  setCssPosition,
  setCssSize,
} from "./functions.js";

class MovingRoundArea {
  constructor(parent, radius, offset, cssClass) {
    this.parent = parent; // object to follow
    this.radius = radius;
    this.offset = offset; // offset from parent position
    this.cssClass = cssClass;
    this.htmlElement = this.createHtmlElement();
  }

  createHtmlElement() {
    const radiusElement = createElementWithClass("div", this.cssClass);
    document.getElementById("game-container").appendChild(radiusElement);
    return radiusElement;
  }

  update() {
    console.log("MovingRoundArea update");
    console.log("Parent Position:", this.parent.position);
    console.log("Offset:", this.offset);

    const radiusDiameter = this.radius * 2;
    const parentPosition = getCssPosition(this.parent.htmlElement);
    const newPosition = {
      x: parentPosition.x - this.offset.x,
      y: parentPosition.y - this.offset.y,
    };

    console.log("New Position:", newPosition);

    setCssSize(this.htmlElement, radiusDiameter, radiusDiameter);
    setCssPosition(this.htmlElement, newPosition.x, newPosition.y);
  }
}

export { MovingRoundArea };
