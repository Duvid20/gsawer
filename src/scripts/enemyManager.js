import { Melee, Ranged } from "./enemy.js";

class EnemyManager {
  constructor(game) {
    this.game = game;
    this.enemies = [];
    this.spawnInterval = 1000;
    this.spawnLoop();
  }

  spawnMelee(amount, position) {
    for (let i = 0; i < amount; i++) {
      const enemy = new MeleeEnemy(this.game, position);
      this.enemies.push(enemy);
    }
  }

  spawnRanged(amount, position) {
    for (let i = 0; i < amount; i++) {
      const enemy = new RangedEnemy(this.game, position);
      this.enemies.push(enemy);
    }
  }
}
