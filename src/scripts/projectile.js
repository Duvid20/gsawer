class Projectile {
  constructor(game, x, y, rotation, fromEnemy, damage) {
    this.game = game;
    this.context = game.context;
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.radius = 5;
    this.speed = 10;
    this.fromEnemy = fromEnemy;
    this.damage = damage;
  }

  update() {
    this.x += Math.cos(this.rotation) * this.speed;
    this.y += Math.sin(this.rotation) * this.speed;
  }

  draw() {
    this.context.fillStyle = "yellow";
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.fill();
  }

  isOutOfBounds(width, height) {
    return this.x < 0 || this.x > width || this.y < 0 || this.y > height;
  }

  delete() {
    this.game.projectiles = this.game.projectiles.filter((p) => p !== this);
  }
}

export { Projectile };
