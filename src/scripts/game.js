import { Player } from "./player.js";
import { ItemManager } from "./itemManager.js";
import { Inventory } from "./inventory.js";
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
    this.pauseOverlay_HTML = document.getElementById("pause-overlay");

    this.inventoryKey = "e";
    this.pauseKey = "Escape";

    this.player;
    this.itemManager = new ItemManager();
    this.inventory = new Inventory();
    this.gameRunning = false; // has player pressed start button
    this.gamePaused = false; // did player pause game with pause key while game running
    this.pauseOverlayOpened = false;

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

    document.addEventListener("keydown", (event) => {
      // toggle pausing
      if (this.gameRunning && event.key === this.pauseKey) {
        if (this.pauseOverlayOpened) {
          this.unpause();
          elementDisplayNone(this.pauseOverlay_HTML);
        } else {
          this.pause();
          elementDisplayFlex(this.pauseOverlay_HTML);
        }

        this.pauseOverlayOpened = !this.pauseOverlayOpened;
      }
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

    // testing: drop coin
    this.itemManager.collectCoin(1);
    this.itemManager.dropEnergyDrinks({ x: 200, y: 200 }, false, 3);
    this.itemManager.dropCoins({ x: 250, y: 230 }, false, 2);
    console.log("Game started");
  }

  end() {
    elementDisplayFlex(this.landingOverlay_HTML);
    this.gameContainer_HTML.style.cursor = "pointer";
    this.gameRunning = false;
    console.log("Game ended");
  }

  pause() {
    elementDisplayNone(this.crosshair_HTML);
    this.gameContainer_HTML.style.cursor = "pointer";

    this.gamePaused = true;
    console.log("Game paused");
  }

  unpause() {
    elementDisplayBlock(this.crosshair_HTML);
    this.gameContainer_HTML.style.cursor = "none";

    this.gamePaused = false;
    console.log("Game unpaused");

    // restart updatePosition loop
    this.player.updatePosition(this);
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
