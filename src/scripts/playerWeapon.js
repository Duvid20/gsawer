import { Projectile } from "./projectile.js";
import {
  getCenterCoordinates,
  calculateAngle,
  setCssPosition,
  setCssRotation,
  createElementWithClass,
} from "./functions.js";

class PlayerWeapon {
  constructor(game, offsetRadius) {
    this.position = { x: 0, y: 0 };
    this.offsetRadius = offsetRadius;
    this.appearence = "-⟭›";
    this.htmlElement = this.createHtmlElement();

    document.addEventListener("click", () => this.shoot(game));
  }

  updatePosition(game) {
    const playerCenter = getCenterCoordinates("#player");
    const cursorPosition = game.cursorPosition;
    const angleToCursor = calculateAngle(playerCenter, cursorPosition, true);

    // position weapon relative to player
    const weaponPosition = {
      x:
        playerCenter.x +
        this.offsetRadius * Math.cos(angleToCursor) -
        this.htmlElement.offsetWidth / 2,
      y:
        playerCenter.y +
        this.offsetRadius * Math.sin(angleToCursor) -
        this.htmlElement.offsetHeight / 2,
    };

    // rotate weapon to face cursor
    const rotateAngle = angleToCursor * (180 / Math.PI);

    // apply position and rotation to weapon
    setCssPosition(this.htmlElement, weaponPosition.x, weaponPosition.y);
    setCssRotation(this.htmlElement, rotateAngle);
  }

  shoot(game) {
    new Projectile(game);
  }

  createHtmlElement() {
    const playerWeapon = createElementWithClass(
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
