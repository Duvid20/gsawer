import { Player } from "./player.js";
import { ItemManager } from "./itemManager.js";

class Game {
  constructor() {
    this.startGameButton_HTML = document.getElementById("start-game-button");
    this.gameContainer_HTML = document.getElementById("game-container");
    this.crosshair_HTML = document.getElementById("crosshair");

    this.player;
    this.itemManager = new ItemManager();
    this.gameRunning = false;

    this.spawnPadding = 50;
    this.enemyStopDistance = 50;
    this.cursorPosition = { x: 0, y: 0 };

    this.startGameButton_HTML.addEventListener("click", () => this.start());
    console.log("Game initialized");
  }

  initEventListeners() {
    document.addEventListener("mousemove", (event) => {
      // update cursor position variable
      this.cursorPosition = {
        x: event.clientX,
        y: event.clientY,
      };
      // crosshair position
      this.setCrosshairPosition();
    });
  }

  start() {
    this.gameRunning = true;
    this.initEventListeners();

    this.elementDisplayNone(this.startGameButton_HTML);
    this.elementDisplayBlock(this.crosshair_HTML);
    this.gameContainer_HTML.style.cursor = "none";
    this.player = new Player(this);

    // start spawning enemies after a delay
    // setTimeout(() => this.spawnEnemy(), 2000);

    console.log("Game started");
  }

  end() {
    this.elementDisplayFlex(this.startGameButton_HTML);
    this.gameContainer_HTML.style.cursor = "pointer";
    this.gameRunning = false;
    console.log("Game ended");
  }

  updatePosition(element, velocity, conditionCallback) {
    const move = () => {
      if (conditionCallback()) {
        this.setCssPosition(
          element,
          parseFloat(element.style.left) + velocity.x,
          parseFloat(element.style.top) + velocity.y
        );
        requestAnimationFrame(move);
      }
    };
    requestAnimationFrame(move);
  }

  elementDisplayNone(element) {
    element.style.display = "none";
  }

  elementDisplayBlock(element) {
    element.style.display = "block";
  }

  elementDisplayFlex(element) {
    element.style.display = "flex";
  }

  createElementWithClass(type, className, id, textContent) {
    const element = document.createElement(type);
    if (className) element.className = className;
    if (id) element.id = id;
    if (textContent) element.textContent = textContent;
    return element;
  }

  getCenterCoordinates(selector) {
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

  setCssPosition(element, x, y) {
    element.style.left = x + "px";
    element.style.top = y + "px";
  }

  setCssRotation(element, angle) {
    element.style.transform = `rotate(${angle}deg)`;
  }

  setCrosshairPosition() {
    // center crosshair on cursor
    this.setCssPosition(
      this.crosshair_HTML,
      this.cursorPosition.x - this.crosshair_HTML.offsetWidth / 2,
      this.cursorPosition.y - this.crosshair_HTML.offsetHeight / 2
    );
  }

  calculateAngle(a, b, inRadians) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const angleInRadians = Math.atan2(dy, dx);

    if (inRadians) return angleInRadians;

    const angleInDegrees = angleInRadians * (180 / Math.PI);
    return angleInDegrees;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const game = new Game();
});
