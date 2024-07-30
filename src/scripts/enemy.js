import { createElementWithClass, getCenterCoordinates } from "./functions.js";

class Enemy {
  constructor(game, id) {
    this.game = game;
    this.htmlElement = this.createHtmlElement();
    this.health = 0;
    this.speed = 0;
    this.damage = 0;
    this.position = { x: 0, y: 0 };
    this.cssClass = "";

    this.moveLoop();
  }

  createHtmlElement() {
    const element = createElementWithClass("div", "enemy");
    document.getElementById("game-container").appendChild(element);
    return element;
  }

  moveLoop() {
    if (this.game.gameRunning && !this.game.gamePaused) {
      this.updatePosition();
      requestAnimationFrame(() => this.moveLoop());
    }
  }

  takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) this.die();
  }

  die() {
    // Handle enemy death
    console.log("Enemy died");
  }

  moveTowards(targetPosition) {
    const position = getCenterCoordinates(".enemy"); // Ensure this selector is correct
    const dx = targetPosition.x - position.x;
    const dy = targetPosition.y - position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > this.stopDistance) {
      const velocity = {
        x: (dx / distance) * this.speed,
        y: (dy / distance) * this.speed,
      };
      return velocity;
    } else {
      return { x: 0, y: 0 };
    }
  }

  updatePosition() {
    const targetPosition = this.game.player.position;
    const enemyElement = document.querySelector(".enemy");
    if (enemyElement) {
      const velocity = this.moveTowards(targetPosition);
      this.position.x += velocity.x;
      this.position.y += velocity.y;
      // Update HTML element position
    } else {
      console.error("Enemy element not found in the DOM");
    }
  }

  dropLoot() {
    // Handle loot dropping
    console.log("Loot dropped");
  }
}

class Melee extends Enemy {
  constructor(game) {
    super(game);
    this.health = 10;
    this.speed = 2;
    this.damage = 1;
    this.drops = ["coin"];
  }
}

class Ranged extends Enemy {
  constructor(game) {
    super(game);
    this.health = 5;
    this.speed = 1;
    this.damage = 2;
    this.drops = ["energyDrink"];
  }
}

export { Enemy, Melee, Ranged };
