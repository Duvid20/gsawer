import { Projectile } from "./projectile.js";
import { HealthBar } from "./healthBar.js";
import { Coin, EnergyDrink } from "./item.js";
import { calculateAngle } from "./functions.js";
import { PoisonArea } from "./collideableArea.js";

class Enemy {
  constructor(game, x, y, health, color, damage, speed, attackSpeed) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.health = health;
    this.color = color;
    this.damage = damage;
    this.speed = speed;
    this.attackSpeed = attackSpeed;
    this.attackInterval = setInterval(() => this.attack(), attackSpeed);

    this.context = game.context;
    this.radius = 15;
    this.healthBar = new HealthBar(
      game,
      x,
      y,
      30,
      "red",
      this.health,
      this.health
    );
  }

  attack() {}

  isPlayerInRange() {
    return this.distanceToPlayer() < this.distance;
  }

  distanceToPlayer() {
    return this.game.distanceToPlayer(this.x, this.y);
  }

  shootProjectile(angle) {
    const projectile = new Projectile(
      this.game,
      this.x,
      this.y,
      angle,
      true,
      this.damage
    );
    this.game.projectiles.push(projectile);
  }

  calculateAttackAngle() {
    return calculateAngle(
      this.x,
      this.y,
      this.game.player.x,
      this.game.player.y
    );
  }

  update() {
    this.moveTowardsPlayer();
    this.healthBar.update(this.x, this.y, this.radius);
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

  draw() {
    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.fill();

    this.healthBar.draw();
  }

  takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.die(this.game);
    }
    this.healthBar.decrease(amount);
  }

  die() {
    // handle enemy death
    clearInterval(this.attackInterval);
    this.dropLoot();
    this.game.enemiesKilled++;
    this.delete();
  }

  delete() {
    this.game.enemies = this.game.enemies.filter((enemy) => enemy !== this);
  }

  dropLoot() {
    this.drops.forEach((drop) => {
      if (Math.random() <= drop.chance) {
        this.game.itemManager.createItems(
          drop.drop,
          { x: this.x, y: this.y },
          drop.amount,
          false
        );
      }
    });
  }
}

class MeleeEnemy extends Enemy {
  constructor(game, x, y) {
    super(game, x, y, 7, "red", 3, 2, 0, 0);
    this.speed = 1.5;
    this.distance = 0;
    this.drops = [{ drop: Coin, amount: 1, chance: 1 }];
  }

  attack() {
    if (this.distanceToPlayer() < this.distance) {
      console.log("melee enemy attacked");
    }
  }
}

class RangedEnemy extends Enemy {
  constructor(game, x, y) {
    super(game, x, y, 4, "pink", 1, 1, 300);
    this.distance = 200;
    this.attackTime = 300;
    this.drops = [
      { drop: EnergyDrink, amount: 1, chance: 0.5 },
      { drop: Coin, amount: 2, chance: 1 },
    ];
  }

  attack() {
    if (this.isPlayerInRange()) {
      const angle = this.calculateAttackAngle(this.x, this.y, this.game.player);
      this.shootProjectile(angle);
    }
  }
}

class PoisonEnemy extends Enemy {
  constructor(game, x, y) {
    super(game, x, y, 1, "purple", 2, 1, 500);
    this.distance = 50;
    this.drops = [{ drop: Coin, amount: 2, chance: 1 }];
    this.poisonArea = new PoisonArea(
      game,
      this.x,
      this.y,
      this.distance + 10,
      "green",
      this.damage,
      this.attackSpeed,
      [game.player]
    );
  }

  attack() {
    if (this.isPlayerInRange()) {
      this.game.player.takeDamage(this.damage);
    }
  }

  update() {
    super.update();
    this.poisonArea.update(this.x, this.y);
  }

  draw() {
    super.draw();
    this.poisonArea.draw();
  }

  delete() {
    super.delete();
    this.poisonArea.destroy();
  }
}

export { MeleeEnemy, RangedEnemy, PoisonEnemy };
