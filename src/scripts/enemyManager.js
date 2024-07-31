import { Melee, Ranged } from "./enemy.js";
import { randomPositionInArea } from "./functions.js";

class EnemyManager {
  constructor(game) {
    this.game = game;
    this.enemies = [];
    this.spawnInterval = 1000;
    this.spawnRadius = 40;
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
      const randomPosition = randomPositionInArea(position, this.spawnRadius);
      const enemy = new type(this.game, randomPosition);
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
