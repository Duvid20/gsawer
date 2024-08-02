import { Inventory } from "./inventory.js";
import { HealthBar } from "./healthBar.js";

class Player {
  constructor(game, x, y) {
    this.game = game;
    this.context = game.context;
    this.x = x;
    this.y = y;
    this.maxHealth = 100;
    this.health = this.maxHealth;
    this.radius = 20;
    this.speed = 5;
    this.inventory = new Inventory();
    this.healthBar = new HealthBar(
      game,
      x,
      y,
      60,
      "green",
      this.maxHealth,
      this.maxHealth,
    );
    this.collectionRadius = 40;
    this.fireRate = 1;
    this.fireRateBoostEndTime = 0;

    this.keys = {};
  }

  handleKeyDown(e) {
    this.keys[e.key] = true;
  }

  handleKeyUp(e) {
    this.keys[e.key] = false;
  }

  update() {
    if (this.keys["a"] || this.keys["ArrowLeft"]) this.x -= this.speed;
    if (this.keys["d"] || this.keys["ArrowRight"]) this.x += this.speed;
    if (this.keys["w"] || this.keys["ArrowUp"]) this.y -= this.speed;
    if (this.keys["s"] || this.keys["ArrowDown"]) this.y += this.speed;
    this.game.playerWeapon.update();
    this.healthBar.update({ x: this.x, y: this.y }, this.radius);
  }

  draw() {
    this.context.fillStyle = "blue";
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.fill();

    this.game.playerWeapon.draw();
    this.healthBar.draw();
  }

  collectItemsWithinRadius() {
    const items = this.game.itemManager.getDroppedItems();
    const playerCenter = getCenterCoordinatesBySelector("#player");

    items.forEach((item) => {
      const itemCenter = getCenterCoordinates(item.htmlElement);
      const { distance } = calcDistance(itemCenter, playerCenter);

      if (distance <= this.collectionRadius) {
        this.inventory.addItem(item);
        item.collect();
      }
    });
  }

  increaseFireRate(duration) {
    this.fireRate *= 2;
    this.fireRateBoostEndTime = Date.now() + duration * 1000;
    this.updateFireRateDisplay();
  }

  updateFireRateDisplay() {
    const remainingTime = Math.max(0, this.fireRateBoostEndTime - Date.now());
    document.getElementById("fire-rate-timer").innerText = `Boost: ${
      remainingTime / 1000
    }s`;
    if (remainingTime > 0) {
      setTimeout(() => this.updateFireRateDisplay(), 100);
    } else {
      this.fireRate /= 2; // Reset fire rate
    }
  }

  takeDamage(amount) {
    this.health -= amount;
    this.healthBar.decrease(amount);
    console.log("Player took damage", amount, "health left", this.health);

    if (this.health <= 0) {
      this.die();
    }
  }

  die() {
    this.game.endGame();
  }
}

export { Player };
