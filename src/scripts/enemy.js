import { Projectile } from "./projectile.js";
import { HealthBar } from "./healthBar.js";
import { Coin, EnergyDrink } from "./item.js";

class Enemy {
  constructor(game, x, y, health, color, damage, speed) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.health = health;
    this.color = color;
    this.damage = damage;
    this.speed = speed;

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

  update() {
    this.moveTowardsPlayer();
    this.healthBar.update({ x: this.x, y: this.y }, this.radius);
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
    // Handle enemy death
    console.log("Enemy died");
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
    console.log("Loot dropped");
  }
}

class MeleeEnemy extends Enemy {
  constructor(game, x, y) {
    super(game, x, y, 7, "red", 3, 2);
    this.speed = 1.5;
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
    super(game, x, y, 4, "pink", 1, 1);
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
  }
}

export { MeleeEnemy, RangedEnemy };
