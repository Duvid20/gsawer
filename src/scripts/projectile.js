import {
  setCssPosition,
  setCssRotation,
  createElementWithClass,
  getCenterCoordinates,
  calculateAngle,
  calculateVelocity,
} from "./functions.js";

class Projectile {
  constructor(game, spawnPosition) {
    this.htmlElement = this.createHTML(game);
    this.color = "red";
    this.speed = 20;
    this.spawnPosition = spawnPosition;
    this.angle = calculateAngle(this.spawnPosition, game.cursorPosition, false);
    this.velocity = calculateVelocity(this.angle, this.speed);

    this.setCss();
    this.updateProjectilePosition(game);
  }

  createHTML(game) {
    const projectile = createElementWithClass("div", "projectile");
    game.gameContainer_HTML.appendChild(projectile);
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

  updateProjectilePosition(game) {
    game.updatePosition(this.htmlElement, this.velocity, () => {
      let projectileX = parseFloat(this.htmlElement.style.left);
      let projectileY = parseFloat(this.htmlElement.style.top);

      // remove it if offscreen
      if (
        projectileX < 0 ||
        projectileX > game.gameContainer_HTML.clientWidth ||
        projectileY < 0 ||
        projectileY > game.gameContainer_HTML.clientHeight
      ) {
        this.htmlElement.remove();
        return false;
      }
      return true;
    });
  }
}

export { Projectile };
