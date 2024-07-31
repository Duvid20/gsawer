import { Melee, Ranged } from "./enemy.js";

class EnemyManager {
  constructor(game) {
    this.game = game;
    this.enemies = [];
    this.spawnInterval = 1000;
    // this.spawnLoop();
  }

  spawnMelee(amount, position) {
    this.spawnEnemy(Melee, amount, position);
  }

  spawnRanged(amount, position) {
    this.spawnEnemy(Ranged, amount, position);
  }

  spawnEnemy(type, amount, position) {
    for (let i = 0; i < amount; i++) {
      const enemy = new type(this.game,position);
      this.enemies.push(enemy);
    }
  }

  removeEnemy(enemy) {
    this.enemies = this.enemies.filter((e) => e !== enemy);
    enemy.htmlElement.remove();
    enemy = null;
  }
}

export { EnemyManager };
