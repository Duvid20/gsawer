import { Projectile } from "./projectile.js";

class PlayerWeapon {
  constructor(game, offsetRadius) {
    this.position = { x: 0, y: 0 };
    this.offsetRadius = offsetRadius;
    this.appearence = "-⟭›";
    this.htmlElement = this.createHtmlElement(game);

    document.addEventListener("click", () => this.shoot(game));
  }

  updatePosition(game) {
    // center of weapon on center of player
    const playerCenter = game.getCenterCoordinates("#player");
    const weaponCenter = {
      x: playerCenter.x - this.htmlElement.offsetWidth / 2,
      y: playerCenter.y - this.htmlElement.offsetHeight / 2,
    };

    game.setCssPosition(this.htmlElement, weaponCenter.x, weaponCenter.y);

    const cursorPosition = game.cursorPosition;

    // rotate weapon and offset it
    const angleToCursor = game.calculateAngle(
      playerCenter,
      cursorPosition,
      true
    );

    const weaponX =
      playerCenter.x +
      this.offsetRadius * Math.cos(angleToCursor) -
      window.scrollX;
    const weaponY =
      playerCenter.y +
      this.offsetRadius * Math.sin(angleToCursor) -
      window.scrollY;

    game.setCssPosition(this.htmlElement, weaponX, weaponY);

    const rotateAngle = angleToCursor * (180 / Math.PI);
    game.setCssRotation(this.htmlElement, rotateAngle);
  }

  shoot(game) {
    new Projectile(game);
  }

  createHtmlElement(game) {
    const playerWeapon = game.createElementWithClass(
      "div",
      "fit-content",
      "player-weapon",
      this.appearence
    );

    document.getElementById("game-container").appendChild(playerWeapon);
    return playerWeapon;
  }
}

export { PlayerWeapon };
