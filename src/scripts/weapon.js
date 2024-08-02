class Weapon {
  constructor(game, parent, damage) {
    this.game = game;
    this.context = game.context;
    this.parent = parent;
    this.damage = damage;
    this.rotation = 0;
    this.x = this.parent.x;
    this.y = this.parent.y;
    this.lastPosition;
  }

  rotateToPosition(position) {
    this.lastPosition = position;
    this.rotation = Math.atan2(position.y - this.parent.y, position.x - this.parent.x);
  }

  update() {
    this.x = this.parent.x;
    this.y = this.parent.y;

    if (this.lastPosition) {
      this.rotateToPosition(this.lastPosition);
    }
  }

  draw() {
    this.context.save();
    this.context.translate(this.x, this.y);
    this.context.rotate(this.rotation);
    this.context.fillStyle = "red";
    this.context.fillRect(20, -5, 20, 10);
    this.context.restore();
  }
}

export { Weapon };
