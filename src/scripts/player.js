import { HealthBar } from "./healthBar.js";
import { CollidableArea } from "./collideableArea.js";

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
    this.collectionRadius = 40;
    this.fireRate = 1;
    this.fireRateBoostEndTime = 0;
    this.keys = {};

    this.healthBar = new HealthBar(
      game,
      x,
      y,
      60,
      "green",
      this.maxHealth,
      this.maxHealth
    );
    this.collectionArea = new CollidableArea(
      game,
      this.x,
      this.y,
      30,
      "gray",
      0.2
    );
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

    // player cannot leave viewport
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.canvas.width) this.x = this.game.canvas.width;
    if (this.y < 0) this.y = 0;
    if (this.y > this.game.canvas.height) this.y = this.game.canvas.height;

    // update health bar and collection area
    this.healthBar.update(this.x, this.y, this.radius);
    this.collectionArea.update(this.x, this.y);
  }

  draw() {
    this.context.fillStyle = "blue";
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.fill();

    this.healthBar.draw();
    this.collectionArea.draw();
  }

  handleMouseMove(e) {
    const { left, top } = this.game.canvas.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    this.game.playerWeapon.rotateToPosition({ x: mouseX, y: mouseY });
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
    this.game.updateViewport();
  }

  takeDamage(amount) {
    this.health -= amount;
    this.healthBar.decrease(amount);

    if (this.health <= 0) {
      this.die();
    }
  }

  die() {
    this.game.endGame();
  }
}

export { Player };
