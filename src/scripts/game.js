import { Player } from "./player.js";
import { ItemManager } from "./itemManager.js";
import { EnemyManager } from "./enemyManager.js";
import { Inventory } from "./inventory.js";
import { Coin, EnergyDrink } from "./item.js";
import {
  elementDisplayNone,
  elementDisplayBlock,
  elementDisplayFlex,
  setCssPosition,
  getCenterOfScreen,
  isColliding,
  getBoundingBox,
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
    this.itemManager;
    this.enemyManager;
    this.inventory;
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
      if (
        this.gameRunning &&
        !this.inventory.inventoryOpened &&
        event.key === this.pauseKey
      ) {
        if (this.pauseOverlayOpened) {
          this.unpause();
          elementDisplayNone(this.pauseOverlay_HTML);
        } else {
          this.pause();
          elementDisplayFlex(this.pauseOverlay_HTML);
        }

        this.pauseOverlayOpened = !this.pauseOverlayOpened;
      }

      if (
        this.gameRunning &&
        !this.pauseOverlayOpened &&
        event.key === this.inventoryKey
      ) {
        this.inventory.toggle(this);
      }
    });
  }

  start() {
    this.gameRunning = true;
    this.initEventListeners();

    elementDisplayNone(this.landingOverlay_HTML);
    elementDisplayBlock(this.crosshair_HTML);
    this.gameContainer_HTML.style.cursor = "none";
    this.itemManager = new ItemManager(this);
    this.enemyManager = new EnemyManager(this);
    this.inventory = new Inventory(this);
    this.player = new Player(this);

    this.setCrosshairPosition();

    // testing
    this.itemManager.createItems(Coin, { x: 34, y: 230 }, 3, false);

    this.enemyManager.spawnMelee(3, { x: 10, y: 24 });
    this.enemyManager.spawnRanged(2, { x: 45, y: 76 });

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
    this.gameContainer_HTML.style.cursor = "default";

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

  checkCollisions() {
    const playerBox = getBoundingBox(this.player.htmlElement);

    // player-enemy collition
    this.enemyManager.enemies.forEach((enemy) => {
      const enemyBox = getBoundingBox(enemy.htmlElement);
      if (isColliding(playerBox, enemyBox)) {
        this.handlePlayerEnemyCollision(enemy);
      }
    });

    // projectile-enemy collision
    this.player.projectiles.forEach((projectile) => {
      const projectileBox = getBoundingBox(projectile.htmlElement);
      this.enemyManager.enemies.forEach((enemy) => {
        const enemyBox = getBoundingBox(enemy.htmlElement);
        if (isColliding(projectileBox, enemyBox)) {
          this.handleProjectileEnemyCollision(projectile, enemy);
        }
      });
    });
  }

  handlePlayerEnemyCollision(enemy) {
    console.log("Player collided with enemy");
    this.player.takeDamage(enemy.damage);
    enemy.die(this);
  }

  handleProjectileEnemyCollision(projectile, enemy) {
    console.log("Projectile collided with enemy");
    enemy.takeDamage(1);
    projectile.htmlElement.remove();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const game = new Game();
});
