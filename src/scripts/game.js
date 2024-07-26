import { Player } from "./player.js";
import { ItemManager } from "./itemManager.js";
import { Enemy } from "./enemy.js";
import {
  elementDisplayNone,
  elementDisplayBlock,
  elementDisplayFlex,
  setCssPosition,
  getCenterOfScreen,
} from "./functions.js";

class Game {
  constructor() {
    this.startGameButton_HTML = document.getElementById("start-game-button");
    this.landingOverlay_HTML = document.getElementById("landing-overlay");
    this.gameContainer_HTML = document.getElementById("game-container");
    this.crosshair_HTML = document.getElementById("crosshair");

    this.player;
    this.itemManager = new ItemManager();
    this.gameRunning = false;

    this.spawnPadding = 50;
    this.enemyStopDistance = 50;
    this.cursorPosition = getCenterOfScreen();

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

    elementDisplayNone(this.landingOverlay_HTML);
    elementDisplayBlock(this.crosshair_HTML);
    this.gameContainer_HTML.style.cursor = "none";
    this.player = new Player(this);

    this.setCrosshairPosition();

    // start spawning enemies after a delay
    setTimeout(() => new Enemy(this), 2000);

    console.log("Game started");
  }

  end() {
    elementDisplayFlex(this.landingOverlay_HTML);
    this.gameContainer_HTML.style.cursor = "pointer";
    this.gameRunning = false;
    console.log("Game ended");
  }

  updatePosition(element, velocity, conditionCallback) {
    const move = () => {
      if (conditionCallback()) {
        setCssPosition(
          element,
          parseFloat(element.style.left) + velocity.x,
          parseFloat(element.style.top) + velocity.y
        );
        requestAnimationFrame(move);
      }
    };
    requestAnimationFrame(move);
  }

  setCrosshairPosition() {
    // center crosshair on cursor
    setCssPosition(
      this.crosshair_HTML,
      this.cursorPosition.x - this.crosshair_HTML.offsetWidth / 2,
      this.cursorPosition.y - this.crosshair_HTML.offsetHeight / 2
    );
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const game = new Game();
});
