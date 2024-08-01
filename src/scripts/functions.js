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

export function getCenterCoordinatesBySelector(selector) {
  const element = document.querySelector(selector);
  return getCenterCoordinates(element);
}

export function getCenterCoordinates(element) {
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

  const centerPosition = getCenterCoordinates(selector);
  const rect = element.getBoundingClientRect();

  const elementPos = { x: rect.left, y: rect.top };
  const offset = {
    x: centerPosition.x - elementPos.x,
    y: centerPosition.y - elementPos.y,
  };

  return offset;
}

export function randomPositionInArea(position, radius) {
  return {
    x: position.x + getRandomInt(-radius, radius),
    y: position.y + getRandomInt(-radius, radius),
  };
}

export function getMoveVector(
  currentPosition,
  targetPosition,
  speed,
  stopDistance
) {
  const { dx, dy, distance } = calcDistance(currentPosition, targetPosition);

  if (distance > stopDistance) {
    let velocity = calcMoveVector(dx, dy, distance, speed);

    if (isOvershooting(dx, dy, velocity)) {
      velocity = { x: dx, y: dy };
    }

    return velocity;
  } else {
    return { x: 0, y: 0 };
  }
}

export function calcDistance(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return { dx, dy, distance };
}

function calcMoveVector(dx, dy, distance, speed) {
  return {
    x: (dx / distance) * speed,
    y: (dy / distance) * speed,
  };
}

function isOvershooting(dx, dy, velocity) {
  return (
    Math.abs(dx) < Math.abs(velocity.x) || Math.abs(dy) < Math.abs(velocity.y)
  );
}

export function isColliding(box1, box2) {
  return !(
    box1.right < box2.left ||
    box1.left > box2.right ||
    box1.bottom < box2.top ||
    box1.top > box2.bottom
  );
}

export function getBoundingBox(element) {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
  };
}

export function normalizeVelocity(velocity, speed) {
  if (velocity.x !== 0 && velocity.y !== 0) {
    const length = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
    velocity.x = (velocity.x / length) * speed;
    velocity.y = (velocity.y / length) * speed;
  }
  return velocity;
}
