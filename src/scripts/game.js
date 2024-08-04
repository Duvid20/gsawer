import { Player } from "./player.js";
import { Projectile } from "./projectile.js";
import { MeleeEnemy, RangedEnemy } from "./enemy.js";
import { Weapon } from "./weapon.js";
import { ItemManager } from "./itemManager.js";
import { Inventory } from "./inventory.js";

const startGameButton = document.getElementById("start-game-button");
const landingPage = document.getElementById("landing-page");
const gameOverOverlay = document.getElementById("game-over-overlay");
const pauseOverlay = document.getElementById("pause-overlay");
const homeButton = document.getElementById("home-button");
const canvas = document.getElementById("game-canvas");
const crosshair = document.getElementById("crosshair");

class Game {
  constructor() {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");

    // the area the player is confined to. when touching its borders, the viewport will move accordingly
    // this.invisibleBoxWidth = window.innerWidth * 0.4;
    // this.invisibleBoxHeight = window.innerHeight * 0.4;

    // Initialize the invisible box position
    // this.invisibleBoxLeft = (window.innerWidth - this.invisibleBoxWidth) / 2;
    // this.invisibleBoxTop = (window.innerHeight - this.invisibleBoxHeight) / 2;

    this.init();
    this.spawnEnemy();
    this.startGameLoop();
  }

  init() {
    this.resizeCanvas();

    this.gameRunning = false;
    this.gamePaused = false;
    this.pauseOverlayOpened = false;

    this.itemManager = new ItemManager(this);
    this.projectiles = [];
    this.enemies = [];
    this.enemySpawnInterval = 700;
    this.enemiesKilled = 0;
    this.enemySpawnIntervalId = null;
    this.player = new Player(
      this,
      this.canvas.width / 2,
      this.canvas.height / 2
    );
    this.playerWeapon = new Weapon(this, this.player, 1);
    this.inventory = new Inventory(this);

    this.initEventListeners();
    this.startGameLoop();
  }

  initEventListeners() {
    document.addEventListener("keydown", (e) => {
      this.player.handleKeyDown(e);
      if (e.key === "e" && this.gameRunning) {
        if (this.inventory.isOpen) {
          this.inventory.close();
          this.unpause();
        } else {
          this.inventory.open();
          this.pause();
          pauseOverlay.style.display = "none";
        }
      }

      if (e.key === " " && this.gameRunning && !this.gamePaused) {
        console.log("Use Energy Drink");
        this.player.inventory.useItem("EnergyDrink", this.player);
      }

      if (e.key === "Escape" && this.gameRunning) {
        console.log("Escape pressed");

        // pause
        if (this.gamePaused) {
          this.unpause();
          pauseOverlay.style.display = "none";
          this.inventory.close();
        } else {
          this.pause();
          this.inventory.close();
          pauseOverlay.style.display = "flex";
        }
      }
    });

    window.addEventListener("resize", () => {
      this.resizeCanvas();
      this.invisibleCircleRadius = this.calcInvisibleCircleRadius();
    });
    window.addEventListener("keyup", (e) => this.player.handleKeyUp(e));
    window.addEventListener("click", () => {
      if (this.gameRunning && !this.gamePaused) {
        this.fireProjectile();
      }
    });
    window.addEventListener("mousemove", (e) => {
      if (this.gameRunning && !this.gamePaused) {
        this.player.handleMouseMove(e);
      }

      if (this.gameRunning) {
        this.setCrosshairPosition(e);
      }
    });
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // evtl.?
    // this.canvas.width = Math.max(window.innerWidth, this.invisibleBoxLeft + this.invisibleBoxWidth);
    // this.canvas.height = Math.max(window.innerHeight, this.invisibleBoxTop + this.invisibleBoxHeight);
  }

  calcInvisibleCircleRadius() {
    return Math.min(window.innerHeight * 0.3, window.innerWidth * 0.3);
  }

  startGameLoop() {
    this.gameRunning = true;
    crosshair.style.display = "flex";
    document.body.style.cursor = "none";

    const loop = () => {
      if (this.gameRunning && !this.gamePaused) {
        this.update();
        this.draw();
        // this.updateViewport();
      }
      requestAnimationFrame(loop);
    };
    loop();
  }

  endGame() {
    this.gameRunning = false;
    gameOverOverlay.style.display = "flex";
    crosshair.style.display = "none";
    document.body.style.cursor = "default";
    clearInterval(this.enemySpawnIntervalId);
  }

  pause() {
    this.gamePaused = true;
    clearInterval(this.enemySpawnIntervalId);
    crosshair.style.display = "none";
    document.body.style.cursor = "default";
  }

  unpause() {
    this.gamePaused = false;
    pauseOverlay.style.display = "none";
    this.spawnEnemy();
    crosshair.style.display = "flex";
    document.body.style.cursor = "none";
  }

  updateProjectiles() {
    this.projectiles.forEach((projectile) => {
      projectile.update();
      if (projectile.isOutOfBounds(this.canvas.width, this.canvas.height)) {
        projectile.delete();
      }
    });
  }

  updateEnemies() {
    this.enemies.forEach((enemy) => {
      enemy.update();
    });
  }

  update() {
    if (this.gameRunning && !this.gamePaused) {
      this.player.update();
      this.playerWeapon.update();
      this.updateProjectiles();
      this.updateEnemies();
      this.checkCollisions();
    }
  }

  drawProjectiles() {
    this.projectiles.forEach((projectile) => projectile.draw());
  }

  drawEnemies() {
    this.enemies.forEach((enemy) => enemy.draw());
  }

  drawItems() {
    this.itemManager.getDroppedItems().forEach((item) => {
      item.draw();
    });
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.draw();
    this.playerWeapon.draw();
    this.drawProjectiles();
    this.drawEnemies();
    this.drawItems();
  }

  setCrosshairPosition(e) {
    crosshair.style.left = `${e.clientX - crosshair.offsetWidth / 2}px`;
    crosshair.style.top = `${e.clientY - crosshair.offsetHeight / 2}px`;
  }

  // isPlayerTouchingBorder() {
  //   const playerX = this.player.x;
  //   const playerY = this.player.y;
  //   const boxLeft = (this.canvas.width - this.invisibleBoxWidth) / 2;
  //   const boxRight = boxLeft + this.invisibleBoxWidth;
  //   const boxTop = (this.canvas.height - this.invisibleBoxHeight) / 2;
  //   const boxBottom = boxTop + this.invisibleBoxHeight;

  //   const touchingBorder =
  //     playerX <= boxLeft ||
  //     playerX >= boxRight ||
  //     playerY <= boxTop ||
  //     playerY >= boxBottom;

  //   console.log("Player touching border:", touchingBorder);
  //   return touchingBorder;
  // }

  // updateViewport() {
  //   const boxLeft = this.invisibleBoxLeft;
  //   const boxRight = boxLeft + this.invisibleBoxWidth;
  //   const boxTop = this.invisibleBoxTop;
  //   const boxBottom = boxTop + this.invisibleBoxHeight;

  //   let canvasResized = false;

  //   if (this.player.x <= boxLeft) {
  //     this.player.x = boxLeft;
  //     this.invisibleBoxLeft -= 10;
  //     this.canvas.style.left = `${
  //       parseInt(this.canvas.style.left || 0) + 10
  //     }px`;
  //     canvasResized = true;
  //     console.log("Moving viewport right");
  //   } else if (this.player.x >= boxRight) {
  //     this.player.x = boxRight;
  //     this.invisibleBoxLeft += 10;
  //     this.canvas.style.left = `${
  //       parseInt(this.canvas.style.left || 0) - 10
  //     }px`;
  //     canvasResized = true;
  //     console.log("Moving viewport left");
  //   }

  //   if (this.player.y <= boxTop) {
  //     this.player.y = boxTop;
  //     this.invisibleBoxTop -= 10;
  //     this.canvas.style.top = `${parseInt(this.canvas.style.top || 0) + 10}px`;
  //     canvasResized = true;
  //     console.log("Moving viewport down");
  //   } else if (this.player.y >= boxBottom) {
  //     this.player.y = boxBottom;
  //     this.invisibleBoxTop += 10;
  //     this.canvas.style.top = `${parseInt(this.canvas.style.top || 0) - 10}px`;
  //     canvasResized = true;
  //     console.log("Moving viewport up");
  //   }

  //   if (canvasResized) {
  //     this.resizeCanvas();
  //   }
  // }

  fireProjectile() {
    const projectile = new Projectile(
      this,
      this.playerWeapon.x,
      this.playerWeapon.y,
      this.playerWeapon.rotation,
      false,
      this.playerWeapon.damage
    );
    this.projectiles.push(projectile);
  }

  spawnEnemy() {
    this.enemySpawnIntervalId = setInterval(() => {
      const enemyType = Math.random() < 0.3 ? MeleeEnemy : RangedEnemy;
      const position = this.randomSpawnPosition();
      this.enemies.push(new enemyType(this, position.x, position.y));
    }, this.enemySpawnInterval);
  }

  randomSpawnPosition() {
    let x, y;
    do {
      x = Math.random() * this.canvas.width;
      y = Math.random() * this.canvas.height;
    } while (this.distanceToPlayer(x, y) < 500);
    return { x, y };
  }

  distanceToPlayer(x, y) {
    return Math.hypot(this.player.x - x, this.player.y - y);
  }

  checkCollisions() {
    this.checkPlayerEnemyCollisions();
    this.checkProjectileCollisions();
    this.checkPlayerItemCollisions();
  }

  checkPlayerEnemyCollisions() {
    this.enemies.forEach((enemy) => {
      if (this.isColliding(this.player, enemy)) {
        this.handlePlayerEnemyCollision(enemy);
      }
    });
  }

  checkProjectileCollisions() {
    this.projectiles.forEach((projectile) => {
      if (!projectile.fromEnemy) {
        this.enemies.forEach((enemy) => {
          if (this.isColliding(projectile, enemy)) {
            this.handleProjectileEnemyCollision(projectile, enemy);
          }
        });
      } else {
        if (this.isColliding(this.player, projectile)) {
          this.handlePlayerProjectileCollision(projectile);
        }
      }
    });
  }

  checkPlayerItemCollisions() {
    this.itemManager.items.forEach((item) => {
      if (this.isColliding(this.player, item)) {
        this.handlePlayerItemCollision(item);
      }
    });
  }

  isColliding(element1, element2) {
    // Helper function to check AABB collision
    // function isAABBColliding(rect1, rect2) {
    //   return (
    //     rect1.x < rect2.x + rect2.width &&
    //     rect1.x + rect1.width > rect2.x &&
    //     rect1.y < rect2.y + rect2.height &&
    //     rect1.y + rect1.height > rect2.y
    //   );
    // }

    // Helper function to check circle-circle collision
    function isCircleColliding(circle1, circle2) {
      const dx = circle1.x - circle2.x;
      const dy = circle1.y - circle2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < circle1.radius + circle2.radius;
    }

    // Helper function to check rectangle-circle collision
    // function isRectCircleColliding(rect, circle) {
    //   const distX = Math.abs(circle.x - rect.x - rect.width / 2);
    //   const distY = Math.abs(circle.y - rect.y - rect.height / 2);

    //   if (distX > rect.width / 2 + circle.radius) {
    //     return false;
    //   }
    //   if (distY > rect.height / 2 + circle.radius) {
    //     return false;
    //   }

    //   if (distX <= rect.width / 2) {
    //     return true;
    //   }
    //   if (distY <= rect.height / 2) {
    //     return true;
    //   }

    //   const dx = distX - rect.width / 2;
    //   const dy = distY - rect.height / 2;
    //   return dx * dx + dy * dy <= circle.radius * circle.radius;
    // }

    // Determine the type of each element

    // const isElement1Arc = element1.radius !== undefined;
    // const isElement2Arc = element2.radius !== undefined;

    // if (!isElement1Arc && !isElement2Arc) {
    //   // Both elements are rectangles
    //   return isAABBColliding(element1, element2);
    // } else if (isElement1Arc && isElement2Arc) {
    // Both elements are circles
    return isCircleColliding(element1, element2);
    // } else {
    //   // One element is a rectangle and the other is a circle
    //   const rect = isElement1Arc ? element2 : element1;
    //   const circle = isElement1Arc ? element1 : element2;
    //   return isRectCircleColliding(rect, circle);
    // }
  }

  handlePlayerEnemyCollision(enemy) {
    this.player.takeDamage(enemy.damage);
    enemy.die();
  }

  handlePlayerProjectileCollision(projectile) {
    if (projectile.fromEnemy) {
      projectile.delete();
      this.player.takeDamage(projectile.damage);
    }
  }

  handleProjectileEnemyCollision(projectile, enemy) {
    if (!projectile.fromEnemy) {
      projectile.delete();
      enemy.takeDamage(projectile.damage);
    }
  }

  handlePlayerItemCollision(item) {
    item.collect();
    console.log("Item collected:", item.name);
  }
}

startGameButton.addEventListener("click", (e) => {
  landingPage.style.display = "none";
  canvas.style.display = "block";
  const game = new Game();
  game.setCrosshairPosition(e);
});

homeButton.addEventListener("click", () => {
  gameOverOverlay.style.display = "none";
  landingPage.style.display = "flex";
});
