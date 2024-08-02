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
  }

  draw() {
    this.context.font = "22px Courier New";
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillStyle = this.color;
    this.context.fillText(this.symbol, this.position.x, this.position.y);
  }

  drop(position) {
    this.inInventory = false;
    this.position = randomPositionInArea(
      position,
      this.game.itemManager.dropRadius
    );
    this.draw();
  }

  collect() {
    this.inInventory = true;
    this.deleteHtmlElement();
  }

  delete() {
    this.deleteHtmlElement();
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
