import {
  createElementWithClass,
  setCssPosition,
  randomPositionInArea,
} from "./functions.js";

class Item {
  constructor(
    game,
    name,
    symbol,
    cssClassDropped,
    cssClassInventory,
    inInventory
  ) {
    this.game = game;
    this.context = game.context;
    this.canvas = game.canvas;
    this.name = name;
    this.symbol = symbol;
    this.cssClassDropped = cssClassDropped;
    this.cssClassInventory = cssClassInventory;
    this.inInventory = inInventory;
    this.htmlElement;
  }

  draw() {
    this.context.font = "20px Arial";
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.clearRect(this.position.x - 10, this.position.y - 10, 20, 20); // Clear previous position
    this.context.fillText(this.symbol, this.position.x, this.position.y);
  }

  drop(position) {
    this.inInventory = false;
    const randomPosition = randomPositionInArea(
      position,
      this.game.itemManager.dropRadius
    );
    this.position = randomPosition;
    this.draw();
  }

  collect() {
    this.inInventory = true;
    this.deleteHtmlElement();
  }

  delete() {
    deleteHtmlElement();
    this.game.itemManager.removeItem(this);
  }
}

class Coin extends Item {
  constructor(game, inInventory) {
    super(game, "Coin", "©", "coin-dropped", "coin-inventory", inInventory);
  }

  use() {}
}

class EnergyDrink extends Item {
  constructor(game, inInventory) {
    super(
      game,
      "Energy Drink",
      "▯",
      "energy-drink-dropped",
      "energy-drink-inventory",
      inInventory
    );
  }

  use() {
    this.game.player.increaseFireRate(5);
  }
}

export { Coin, EnergyDrink };
