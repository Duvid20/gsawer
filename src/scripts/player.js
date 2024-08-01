import { Inventory } from "./inventory.js";
import { HealthBar } from "./healthBar.js";

class Player {
  constructor(game, x, y) {
    this.x = x;
    this.y = y;
    this.height = this.width = 30;
    this.speed = 5;
    this.game = game;
    this.inventory = new Inventory();
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
  }

  draw(context) {
    context.fillStyle = "blue";
    context.fillRect(this.x - 15, this.y - 15, this.width, this.height);
    this.game.playerWeapon.draw(context);
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
      this.fireRate = 1; // Reset fire rate
    }
  }
}

export { Player };
