class Projectile {
  constructor(canvas, x, y, rotation) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.speed = 10;
  }

  update() {
    this.x += Math.cos(this.rotation) * this.speed;
    this.y += Math.sin(this.rotation) * this.speed;

    if (this.isOutOfBounds()) {
      this.projectiles.splice(index, 1);
    }
  }

  draw(context) {
    context.fillStyle = "yellow";
    context.beginPath();
    context.arc(this.x, this.y, 5, 0, Math.PI * 2);
    context.fill();
  }

  isOutOfBounds() {
    const x = this.canvas.width;
    const y = this.canvas.height;
    return x < 0 || x > width || y < 0 || y > height;
  }
}

export { Projectile };

/*import {
  setCssPosition,
  setCssRotation,
  createElementWithClass,
  calculateAngle,
  calculateVelocity,
} from "./functions.js";

class Projectile {
  constructor(game, spawnPosition) {
    this.game = game;
    this.htmlElement = this.createHTML();
    this.color = "red";
    this.speed = 20;
    this.spawnPosition = spawnPosition;
    this.angle = calculateAngle(this.spawnPosition, game.cursorPosition, false);
    this.velocity = calculateVelocity(this.angle, this.speed);

    this.setCss();
    this.updateProjectilePosition();
  }

  createHTML() {
    const projectile = createElementWithClass("div", "projectile");
    this.game.gameContainer_HTML.appendChild(projectile);
    return projectile;
  }

  setCss() {
    setCssPosition(
      this.htmlElement,
      this.spawnPosition.x,
      this.spawnPosition.y
    );
    setCssRotation(this.htmlElement, this.angle);
  }

  updateProjectilePosition() {
    this.game.updatePosition(this.htmlElement, this.velocity, () => {
      let projectileX = parseFloat(this.htmlElement.style.left);
      let projectileY = parseFloat(this.htmlElement.style.top);

      // remove it if offscreen
      if (
        projectileX < 0 ||
        projectileX > this.game.gameContainer_HTML.clientWidth ||
        projectileY < 0 ||
        projectileY > this.game.gameContainer_HTML.clientHeight
      ) {
        this.htmlElement.remove();
        return false;
      }
      return true;
    });
  }
}

export { Projectile };*/
