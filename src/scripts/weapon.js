class Weapon {
  constructor(game, parent, damage) {
    this.game = game;
    this.context = game.context;
    this.parent = parent;
    this.damage = damage;
    this.rotation = 0;
    this.x = this.parent.x;
    this.y = this.parent.y;
    this.lastMouseEvent;
  }

  rotateToCursor(e) {
    this.lastMouseEvent = e;
    const { left, top } = this.game.canvas.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    this.rotation = Math.atan2(mouseY - this.parent.y, mouseX - this.parent.x);
  }

  update() {
    this.x = this.parent.x;
    this.y = this.parent.y;

    if (this.lastMouseEvent) {
      this.rotateToCursor(this.lastMouseEvent);
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
