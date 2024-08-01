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
/*import { Projectile } from "./projectile.js";
import {
  getCenterCoordinatesBySelector,
  calculateAngle,
  setCssPosition,
  setCssRotation,
  createElementWithClass,
} from "./functions.js";

class PlayerWeapon {
  constructor(game, offsetRadius) {
    this.game = game;
    this.position = { x: 0, y: 0 };
    this.offsetRadius = offsetRadius;
    this.appearence = "-⟭›";
    this.htmlElement = this.createHtmlElement();

    document.addEventListener("click", () => this.shoot());
  }

  updatePosition() {
    const playerCenter = getCenterCoordinatesBySelector("#player");
    const cursorPosition = this.game.cursorPosition;
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

  shoot() {
    if (!this.game.gamePaused && this.game.gameRunning) {
      const projectile = new Projectile(
        this.game,
        getCenterCoordinatesBySelector("#player-weapon")
      );
      this.game.player.projectiles.push(projectile);
    }
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

export { PlayerWeapon };*/
