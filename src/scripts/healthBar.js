

/*import {
  createElementWithClass,
  setCssPosition,
  setCssSize,
  setCssBgColor,
} from "./functions.js";

class HealthBar {
  constructor(max, current, parentElement, color, width, placeAbove) {
    this.max = max;
    this.value = current;
    this.parentElement = parentElement;
    this.color = color;
    this.width = width;
    this.height = parseInt(width / 8);
    this.placeAbove = placeAbove;
    this.offsetY = 5;

    this.htmlElementContainer = this.createHtmlElementContainer();
    this.htmlElementProgress = this.createHtmlElementProgress();

    this.setHtmlPosition();
    this.setHtmlValues();
  }

  decrease(amount) {
    this.value -= amount;
    if (this.value < 0) this.value = 0;
    this.setHtmlValues();
  }

  increase(amount) {
    this.value += amount;
    if (this.value > max) this.value = max;
    this.setHtmlValues();
  }

  createHtmlElementContainer() {
    const healthBarContainer = createElementWithClass(
      "div",
      "health-bar-container"
    );
    this.parentElement.appendChild(healthBarContainer);

    return healthBarContainer;
  }

  createHtmlElementProgress() {
    const healthBarProgress = createElementWithClass(
      "div",
      "health-bar-progress"
    );
    this.htmlElementContainer.appendChild(healthBarProgress);

    return healthBarProgress;
  }

  calcHtmlPosition() {
    const parentRect = this.parentElement.getBoundingClientRect();
    let position = { x: 0, y: 0 };
    position.x = parentRect.left - this.width / 2 + parentRect.width / 2;

    if (this.placeAbove) {
      position.y =
        parentRect.top + parentRect.height + this.height + this.offsetY;
    } else {
      position.y = parentRect.top - this.height - this.offsetY;
    }

    return position;
  }

  setHtmlPosition() {
    const position = this.calcHtmlPosition();
    setCssPosition(this.htmlElementContainer, position.x, position.y);
  }

  setHtmlValues() {
    setCssSize(this.htmlElementContainer, this.width, this.height);
    setCssBgColor(this.htmlElementProgress, this.color);
    setCssSize(
      this.htmlElementProgress,
      this.calculateProgressWidth(),
      this.height
    );
  }

  calculateProgressWidth() {
    let width = (this.value / this.max) * this.width;
    return parseInt(width);
  }
}

export { HealthBar };*/
