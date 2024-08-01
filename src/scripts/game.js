import { Player } from "./player.js";
import { Projectile } from "./projectile.js";
import { MeleeEnemy, RangedEnemy } from "./enemy.js";
import { Weapon } from "./weapon.js";
import { ItemManager } from "./itemManager.js";

const landingPage = document.getElementById("landing-page");
const canvas = document.getElementById("game-canvas");

class Game {
  constructor() {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");

    this.init();
    this.spawnEnemy();
    this.startGameLoop();
  }

  init() {
    this.gameRunning = false;
    this.pauseOverlayOpened = false;
    this.player = new Player(
      this,
      this.canvas.width / 2,
      this.canvas.height / 2
    );
    this.playerWeapon = new Weapon(this, this.player);
    this.itemManager = new ItemManager(this);
    this.projectiles = [];
    this.enemies = [];

    this.resizeCanvas();
    this.initEventListeners();
    this.startGameLoop();
  }

  initEventListeners() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "e") {
        this.player.inventory.toggle();
      }

      if (event.key === " ") {
        this.player.inventory.useItem("EnergyDrink", this.player);
      }

      if (event.key === "Escape") {
        // open pause overlay
      }
    });

    window.addEventListener("resize", () => this.resizeCanvas());
    window.addEventListener("keydown", (e) => this.player.handleKeyDown(e));
    window.addEventListener("keyup", (e) => this.player.handleKeyUp(e));
    window.addEventListener("click", () => this.fireProjectile());
    window.addEventListener("mousemove", (e) =>
      this.playerWeapon.rotateToCursor(e)
    );
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  startGameLoop() {
    this.gameRunning = true;
    const loop = () => {
      this.update();
      this.draw();
      requestAnimationFrame(loop);
    };
    loop();
  }

  endGame() {
    this.gameRunning = false;
  }

  update() {
    this.player.update();
    this.projectiles.forEach((projectile, index) => {
      projectile.update();
      if (projectile.isOutOfBounds(this.canvas.width, this.canvas.height)) {
        this.projectiles.splice(index, 1);
      }
    });
    this.enemies.forEach((enemy) => {
      enemy.update();
    });
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.player.draw(this.context);
    this.projectiles.forEach((projectile) => projectile.draw(this.context));
    this.enemies.forEach((enemie) => enemie.draw(this.context));
  }

  fireProjectile() {
    const projectile = new Projectile(
      this.playerWeapon.x,
      this.playerWeapon.y,
      this.playerWeapon.rotation
    );
    this.projectiles.push(projectile);
  }

  spawnEnemy() {
    setInterval(() => {
      const enemyType = Math.random() < 0.5 ? MeleeEnemy : RangedEnemy;
      const position = this.randomSpawnPosition();
      this.enemies.push(new enemyType(this, position.x, position.y));
    }, 2000);
  }

  randomSpawnPosition() {
    let x, y;
    do {
      x = Math.random() * this.canvas.width;
      y = Math.random() * this.canvas.height;
    } while (this.distanceToPlayer(x, y) < 300);
    return { x, y };
  }

  distanceToPlayer(x, y) {
    return Math.hypot(this.player.x - x, this.player.y - y);
  }
}

document.getElementById("start-game-button").addEventListener("click", () => {
  landingPage.style.display = "none";
  canvas.style.display = "block";
  new Game();
});

/*import { Player } from "./player.js";
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

    this.enemyManager.spawnMelee(7, { x: 10, y: 24 });
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
});*/
