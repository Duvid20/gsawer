class Projectile {
  constructor(game, event) {
    this.color = "red";
    this.speed = 20;
    this.htmlElement = this.createHTML(game, event);
  }

  createHTML(game) {
    const projectile = game.createElementWithClass("div", "projectile");
    let weaponPosition = game.getCenterCoordinates("#player-weapon");
    let angle = game.calculateAngle(weaponPosition, game.cursorPosition, false);

    game.setCssPosition(projectile, weaponPosition.x, weaponPosition.y);
    projectile.style.transform = `rotate(${angle}deg)`;

    game.gameContainer_HTML.appendChild(projectile);

    // Convert angle to radians and calculate direction vector
    let angleRadians = angle * (Math.PI / 180);
    let velocity = {
      x: Math.cos(angleRadians) * this.speed,
      y: Math.sin(angleRadians) * this.speed,
    };

    // Update projectile position using the updatePosition function
    game.updatePosition(projectile, velocity, () => {
      let projectileX = parseFloat(projectile.style.left);
      let projectileY = parseFloat(projectile.style.top);

      // Condition to keep moving the projectile or remove it if offscreen
      if (
        projectileX < 0 ||
        projectileX > game.gameContainer_HTML.clientWidth ||
        projectileY < 0 ||
        projectileY > game.gameContainer_HTML.clientHeight
      ) {
        projectile.remove();
        return false; // Stop moving the projectile
      }
      return true; // Continue moving the projectile
    });

    return projectile;
  }
}

export { Projectile };
