class Enemy {
  constructor(type, position) {
    this.type = type;
    this.position = position;
    this.health = 100;
  }

  takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) this.die();
  }

  die() {
    console.log(`${this.type} enemy died`);
  }

  moveTowards(targetPosition) {
    // Logic to move enemy towards the player
  }
}

class MeleeEnemy extends Enemy {
  constructor(position) {
    super("melee", position);
  }

  attack() {
    console.log("Melee attack");
  }
}

class RangedEnemy extends Enemy {
  constructor(position) {
    super("ranged", position);
  }

  attack() {
    console.log("Ranged attack");
  }
}

export { MeleeEnemy, RangedEnemy };
