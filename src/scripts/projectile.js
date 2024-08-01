class Projectile {
  constructor(x, y, rotation, fromEnemy) {
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.radius = 5;
    this.speed = 10;
    this.fromEnemy = fromEnemy;
  }

  update() {
    this.x += Math.cos(this.rotation) * this.speed;
    this.y += Math.sin(this.rotation) * this.speed;
  }

  draw(context) {
    context.fillStyle = "yellow";
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }

  isOutOfBounds(width, height) {
    return this.x < 0 || this.x > width || this.y < 0 || this.y > height;
  }
}

export { Projectile };
