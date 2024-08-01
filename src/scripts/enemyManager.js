

/*import { Melee, Ranged } from "./enemy.js";
import { randomPositionInArea } from "./functions.js";

class EnemyManager {
  constructor(game) {
    this.game = game;
    this.enemies = [];
    this.spawnInterval = 5000;
    this.spawnRadius = 40;
    this.spawnLoop();
    this.enemiesSpawned = 0;
  }

  randomSpawnPositionOnScreenBorder() {
    const randomPosition = {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    };
    return randomPosition;
  }

  spawnLoop() {
    setInterval(() => {
      if (!this.game.gamePaused && this.game.gameRunning) {
        const position = this.randomSpawnPositionOnScreenBorder();
        this.spawnMelee(1, position);
        this.spawnRanged(1, position);
      }
    }, this.spawnInterval);
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
      this.enemiesSpawned++;
    }
  }

  removeEnemy(enemy) {
    this.enemies = this.enemies.filter((e) => e !== enemy);
    enemy.htmlElement.remove();
    enemy = null;
  }
}

export { EnemyManager };*/
