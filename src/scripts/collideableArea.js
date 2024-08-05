class CollidableArea {
  constructor(game, x, y, radius, color, opacity) {
    this.game = game;
    this.context = game.context;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.opacity = opacity;
  }

  draw() {
    this.context.fillStyle = this.color;
    this.context.globalAlpha = this.opacity;
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.fill();
    this.context.globalAlpha = 1.0;

    // draw border
    this.context.strokeStyle = this.color;
    this.context.lineWidth = 1;
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.stroke();
  }

  update(x, y) {
    this.x = x;
    this.y = y;
  }

  isCollidingWith(circle) {
    const dx = this.x - circle.x;
    const dy = this.y - circle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.radius + circle.radius;
  }
}

class PoisonArea extends CollidableArea {
  constructor(game, x, y, radius, color, damage, attackInterval, enemies) {
    super(game, x, y, radius, color, 0.1);
    this.damage = damage;
    this.enemies = enemies;
    this.interval = setInterval(() => this.applyDamage(), attackInterval);
  }

  applyDamage() {
    for (const enemy of this.enemies) {
      if (this.isCollidingWith(enemy)) {
        enemy.takeDamage(this.damage);
      }
    }
  }

  destroy() {
    clearInterval(this.interval);
  }
}

export { CollidableArea, PoisonArea };
