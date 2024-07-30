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
  const rect = element.getBoundingClientRect();

  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  
  return { x, y };
}

export function setCssPosition(element, x, y) {
  element.style.left = x + "px";
  element.style.top = y + "px";
}

export function getCssPosition(element) {
  return {
    x: parseFloat(element.style.left),
    y: parseFloat(element.style.top),
  };
}

export function setCssRotation(element, angle) {
  element.style.transform = `rotate(${angle}deg)`;
}

export function setCssSize(element, width, height) {
  element.style.width = width + "px";
  element.style.height = height + "px";
}

export function setCssBgColor(element, color) {
  element.style.backgroundColor = color;
}

export function calculateVelocity(angle, speed) {
  const angleRadians = angle * (Math.PI / 180);
  return {
    x: Math.cos(angleRadians) * speed,
    y: Math.sin(angleRadians) * speed,
  };
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function calcOffsetOfCenter(selector) {
  const element = document.querySelector(selector);
  if (!element) {
    console.error(`Element with id "${selector}" not found`);
    return null;
  }
  const centerPosition = getCenterCoordinates(selector);
  const rect = element.getBoundingClientRect();

  const elementPos = { x: rect.left, y: rect.top };
  const offset = {
    x: centerPosition.x - elementPos.x,
    y: centerPosition.y - elementPos.y,
  };

  return offset;
}
