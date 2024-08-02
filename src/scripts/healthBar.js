class HealthBar {
  constructor(game, x, y, width, color, maxHealth, currentHealth) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.height = parseInt(width / 8);
    this.width = width;
    this.color = color;
    this.maxHealth = maxHealth;
    this.currentHealth = currentHealth;

    this.context = game.context;
  }

  update(parentPosition, parentRadius) {
    this.x = parentPosition.x - this.width / 2;
    this.y = parentPosition.y - parentRadius - this.height - 5;
  }

  draw() {
    this.context.clearRect(0, 0, this.width, this.height);

    // draw border
    this.context.strokeStyle = "white";
    this.context.strokeRect(this.x, this.y, this.width, this.height);

    // draw health bar
    const healthWidth = (this.currentHealth / this.maxHealth) * this.width;
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, healthWidth, this.height);
  }

  decrease(amount) {
    this.currentHealth = Math.max(0, this.currentHealth - amount);
    this.draw(this.context);
  }

  increase(amount) {
    this.currentHealth = Math.min(this.maxHealth, this.currentHealth + amount);
    this.draw(this.context);
  }
}

export { HealthBar };
