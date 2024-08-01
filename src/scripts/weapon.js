class Weapon {
  constructor(game, parent) {
    this.game = game;
    this.parent = parent;
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

  draw(context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.fillStyle = "red";
    context.fillRect(20, -5, 20, 10);
    context.restore();
  }
}

export { Weapon };