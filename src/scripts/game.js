import { Player } from "./player.js";
import { Projectile } from "./projectile.js";
import { MeleeEnemy, RangedEnemy } from "./enemy.js";
import { Weapon } from "./weapon.js";
import { ItemManager } from "./itemManager.js";

const startGameButton = document.getElementById("start-game-button");
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
    this.playerWeapon = new Weapon(this, this.player, 1);
    this.itemManager = new ItemManager(this);
    this.projectiles = [];
    this.enemies = [];
    this.enemySpawnInterval = 2000;
    this.enemiesKilled = 0;

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
    this.projectiles.forEach((projectile) => {
      projectile.update();
      if (projectile.isOutOfBounds(this.canvas.width, this.canvas.height)) {
        projectile.delete();
      }
    });
    this.enemies.forEach((enemy) => {
      enemy.update();
    });
    this.checkCollisions();
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.player.draw(this.context);
    this.projectiles.forEach((projectile) => projectile.draw());
    this.enemies.forEach((enemie) => enemie.draw(this.context));
  }

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
    setInterval(() => {
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
    // player with enemy
    this.enemies.forEach((enemy) => {
      if (this.isColliding(this.player, enemy)) {
        this.handlePlayerEnemyCollision(enemy);
      }
    });

    // enemy or player with projectile
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
    console.log("Player collided with enemy");
    this.player.takeDamage(enemy.damage);
    enemy.die();
  }

  handlePlayerProjectileCollision(projectile) {
    if (projectile.fromEnemy) {
      console.log("Player hit by projectile");
      projectile.delete();
      this.player.takeDamage(projectile.damage);
    }
  }

  handleProjectileEnemyCollision(projectile, enemy) {
    if (!projectile.fromEnemy) {
      console.log("Projectile collided with enemy");
      projectile.delete();
      enemy.takeDamage(projectile.damage);
    }
  }
}

startGameButton.addEventListener("click", () => {
  landingPage.style.display = "none";
  canvas.style.display = "block";
  new Game();
});
