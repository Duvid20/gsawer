import { Projectile } from "./projectile.js";
import { Coin, EnergyDrink } from "./item.js";

class Enemy {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.radius = 15;
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
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
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
    this.game.enemiesKilled++;
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
    this.drops = [{ drop: Coin, amount: 1, chance: 1 }];
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
    this.drops = [
      { drop: EnergyDrink, amount: 1, chance: 0.5 },
      { drop: Coin, amount: 2, chance: 1 },
    ];
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
