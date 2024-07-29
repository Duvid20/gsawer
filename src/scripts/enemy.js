class Enemy {
  constructor(game) {
    // this.types = {
    //   melee: {
    //     health: 10,
    //     speed: 2,
    //     damage: 1,
    //     drops: [game.itemManager.itemList.coin],
    //   },
    //   ranged: {
    //     health: 20,
    //     speed: 1,
    //     damage: 2,
    //     drops: [game.itemManager.itemList.coin, game.itemManager.energyDrink],
    //   },
    // };
    // this.htmlElement = this.createHtmlElement();
    // this.type = "melee";
    // this.health = this.types[this.type].health;
    // this.speed = this.types[this.type].speed;
    // this.damage = this.types[this.type].damage;
    // this.position = { x: 100, y: 200 };
  }

  createHtmlElement() {
    const enemy = document.createElement("div");
    enemy.classList.add("enemy");
    document.getElementById("game-container").appendChild(enemy);
    return enemy;
  }

  takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) this.die();
  }

  die() {
    console.log(`${this.type} enemy died`);
  }

  moveTowards(targetPosition, stopDistance) {
    const dx = targetPosition.x - this.position.x;
    const dy = targetPosition.y - this.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > stopDistance) {
      const velocity = {
        x: (dx / distance) * this.speed,
        y: (dy / distance) * this.speed,
      };
      return velocity;
    } else {
      return { x: 0, y: 0 };
    }
  }

  updatePosition(game, playerPosition, stopDistance) {
    const velocity = this.moveTowards(playerPosition, stopDistance);
    game.updatePosition(this.htmlElement, velocity, () => {
      const dx = playerPosition.x - this.position.x;
      const dy = playerPosition.y - this.position.y;
      return Math.sqrt(dx * dx + dy * dy) > stopDistance;
    });
  }

  dropLoot() {
    // Logic to drop loot
  }
}

export { Enemy };
