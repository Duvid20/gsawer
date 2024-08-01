import { Projectile } from "./projectile.js";
import { Coin, EnergyDrink } from "./item.js";

class Enemy {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
  }

  update() {
    this.moveTowardsPlayer();
  }

  moveTowardsPlayer() {
    const distance = this.game.distanceToPlayer(this.x, this.y);
    if (distance > this.distance) {
      const angle = Math.atan2(
        this.game.player.y - this.y,
        this.game.player.x - this.x
      );
      this.x += this.speed * Math.cos(angle);
      this.y += this.speed * Math.sin(angle);
    }
  }

  draw(context) {
    context.fillStyle = "red";
    context.beginPath();
    context.arc(this.x, this.y, 15, 0, Math.PI * 2);
    context.fill();
  }

  takeDamage(amount) {
    this.health -= amount;
    console.log("Enemy health", this.health);
    if (this.health <= 0) {
      this.die(this.game);
    }
    this.healthBar.decrease(amount);
  }

  die() {
    // Handle enemy death
    console.log("Enemy died");
    this.dropLoot(this.game);
    this.game.enemyManager.removeEnemy(this);
  }

  dropLoot() {
    this.drops.forEach((drop) => {
      if (Math.random() <= drop.chance) {
        this.game.itemManager.createItems(
          drop.drop,
          getCenterCoordinates(this.htmlElement),
          drop.amount,
          false
        );
      }
    });
    console.log("Loot dropped");
  }
}

class MeleeEnemy extends Enemy {
  constructor(game, x, y) {
    super(game, x, y);
    this.speed = 2;
    this.distance = 0;
    this.attackTime = 300;
    this.attackInterval = setInterval(() => this.attack(), this.attackTime);
  }

  attack() {
    const distance = this.game.distanceToPlayer(this.x, this.y);
    if (distance < this.distance) {
      console.log("melee enemy attacked");
    }
  }
}

class RangedEnemy extends Enemy {
  constructor(game, x, y) {
    super(game, x, y);
    this.speed = 1;
    this.distance = 200;
    this.attackTime = 300;
    this.attackInterval = setInterval(() => this.attack(), this.attackTime);
  }

  attack() {
    const distance = this.game.distanceToPlayer(this.x, this.y);
    if (distance < this.distance) {
      const angle = Math.atan2(
        this.game.player.y - this.y,
        this.game.player.x - this.x
      );
      const projectile = new Projectile(this.x, this.y, angle);
      this.game.projectiles.push(projectile);
    }
  }
}

export { MeleeEnemy, RangedEnemy };

/*import {
  createElementWithClass,
  getCenterCoordinatesBySelector,
  getCenterCoordinates,
  setCssPosition,
  getMoveVector,
  getCssPosition,
} from "./functions.js";
import { Coin, EnergyDrink } from "./item.js";
import { HealthBar } from "./healthBar.js";

class Enemy {
  constructor(game, spawnPosition, cssClass, stopDistance, maxHealth) {
    this.game = game;
    this.spawnPosition = spawnPosition;
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    this.speed;
    this.damage;
    this.cssClass = cssClass;
    this.stopDistance = stopDistance;
    this.htmlElement = this.createHtmlElement();
    this.healthBar = new HealthBar(
      this.maxHealth,
      this.maxHealth,
      this.htmlElement,
      "red",
      50,
      false
    );

    this.moveLoop(game);
  }

  createHtmlElement() {
    const element = createElementWithClass("div", "enemy " + this.cssClass);
    document.getElementById("game-container").appendChild(element);
    setCssPosition(element, this.spawnPosition.x, this.spawnPosition.y);
    return element;
  }

  moveLoop() {
    if (this.game.gameRunning && !this.game.gamePaused) {
      this.updatePosition(this.game);
    }
    requestAnimationFrame(() => this.moveLoop(this.game));
  }

  takeDamage(amount) {
    this.health -= amount;
    console.log("Enemy health", this.health);
    if (this.health <= 0) {
      this.die(this.game);
    }
    this.healthBar.decrease(amount);
  }

  die() {
    // Handle enemy death
    console.log("Enemy died");
    this.dropLoot(this.game);
    this.game.enemyManager.removeEnemy(this);
  }

  dropLoot() {
    this.drops.forEach((drop) => {
      if (Math.random() <= drop.chance) {
        this.game.itemManager.createItems(
          drop.drop,
          getCenterCoordinates(this.htmlElement),
          drop.amount,
          false
        );
      }
    });
    console.log("Loot dropped");
  }

  calcNewPosition() {
    const targetPosition = getCenterCoordinatesBySelector("#player");
    const currentPosition = getCssPosition(this.htmlElement);

    const moveVector = getMoveVector(
      currentPosition,
      targetPosition,
      this.speed,
      this.stopDistance
    );
    const newPosition = {
      x: currentPosition.x + moveVector.x,
      y: currentPosition.y + moveVector.y,
    };

    return newPosition;
  }

  updatePosition() {
    const newPosition = this.calcNewPosition();
    setCssPosition(this.htmlElement, newPosition.x, newPosition.y);
    this.game.checkCollisions();
  }
}

class Melee extends Enemy {
  constructor(game, spawnPosition) {
    super(game, spawnPosition, "melee-enemy", 0, 10);
    this.speed = 2;
    this.damage = 1;
    this.drops = [{ drop: Coin, amount: 1, chance: 1 }];
  }
}

class Ranged extends Enemy {
  constructor(game, spawnPosition) {
    super(game, spawnPosition, "ranged-enemy", 100, 5);
    this.speed = 1;
    this.damage = 2;
    this.projectileDamage = 1;
    this.drops = [
      { drop: EnergyDrink, amount: 1, chance: 0.5 },
      { drop: Coin, amount: 2, chance: 1 },
    ];
  }
}

export { Melee, Ranged };*/
