export function calculateAngle(a, b, inRadians) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const angleInRadians = Math.atan2(dy, dx);

  if (inRadians) return angleInRadians;

  const angleInDegrees = angleInRadians * (180 / Math.PI);
  return angleInDegrees;
}

export function getCenterOfScreen() {
  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
}

export function elementDisplayNone(element) {
  element.style.display = "none";
}

export function elementDisplayBlock(element) {
  element.style.display = "block";
}

export function elementDisplayFlex(element) {
  element.style.display = "flex";
}

export function createElementWithClass(type, className, id, textContent) {
  const element = document.createElement(type);
  if (className) element.className = className;
  if (id) element.id = id;
  if (textContent) element.textContent = textContent;
  return element;
}

export function getCenterCoordinates(selector) {
  const element = document.querySelector(selector);
  if (element) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    return { x, y };
  } else {
    console.error("Element not found");
    return null;
  }
}

export function setCssPosition(element, x, y) {
  element.style.left = x + "px";
  element.style.top = y + "px";
}

export function setCssRotation(element, angle) {
  element.style.transform = `rotate(${angle}deg)`;
}
