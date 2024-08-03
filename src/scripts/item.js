import { randomPositionInArea } from "./functions.js";

class Item {
  constructor(game, name, symbol, color, inInventory) {
    this.game = game;
    this.context = game.context;
    this.canvas = game.canvas;
    this.name = name;
    this.symbol = symbol;
    this.color = color;
    this.inInventory = inInventory;
    this.htmlElement;
    this.x = 0;
    this.y = 0;
  }

  draw() {
    this.context.font = "22px Courier New";
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillStyle = this.color;
    this.context.fillText(this.symbol, this.x, this.y);
  }

  drop(position) {
    this.inInventory = false;
    const randomPosition = randomPositionInArea(
      position,
      this.game.itemManager.dropRadius
    );

    this.x = randomPosition.x;
    this.y = randomPosition.y;

    this.draw();
  }

  collect() {
    this.inInventory = true;
  }

  delete() {
    this.game.itemManager.removeItem(this);
  }
}

class Coin extends Item {
  constructor(game, inInventory) {
    super(game, "Coin", "©", "gold", inInventory);
  }

  use() {}
}

class EnergyDrink extends Item {
  constructor(game, inInventory) {
    super(game, "Energy Drink", "▯", "lightgreen", inInventory);
  }

  use() {
    // this.game.player.increaseFireRate(5);
  }
}

export { Item, Coin, EnergyDrink };
