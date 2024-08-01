class HealthBar {
  constructor({
    width,
    height,
    color,
    maxHealth,
    currentHealth,
    placeAbove,
    parentElement,
  }) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.maxHealth = maxHealth;
    this.currentHealth = currentHealth;
    this.placeAbove = placeAbove;
    this.parentElement = parentElement;

    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext("2d");

    this.updatePosition();
    this.draw();
  }

  updatePosition() {
    const parentRect = this.parentElement.getBoundingClientRect();
    const parentCenterX = parentRect.left + parentRect.width / 2;
    const parentCenterY = parentRect.top + parentRect.height / 2;

    this.canvas.style.position = "absolute";
    this.canvas.style.left = `${parentCenterX - this.width / 2}px`;

    if (this.placeAbove) {
      this.canvas.style.top = `${parentRect.top - this.height - 5}px`;
    } else {
      this.canvas.style.top = `${parentRect.bottom + 5}px`;
    }
  }

  draw() {
    const ctx = this.context;
    ctx.clearRect(0, 0, this.width, this.height);

    // Draw border
    ctx.strokeStyle = "white";
    ctx.strokeRect(0, 0, this.width, this.height);

    // Draw health bar
    const healthWidth = (this.currentHealth / this.maxHealth) * this.width;
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, healthWidth, this.height);
  }

  decrease(amount) {
    this.currentHealth = Math.max(0, this.currentHealth - amount);
    this.draw();
  }

  increase(amount) {
    this.currentHealth = Math.min(this.maxHealth, this.currentHealth + amount);
    this.draw();
  }
}

export { HealthBar };
