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
    this.canvas = game.canvas;
    this.name = name;
    this.symbol = symbol;
    this.cssClassDropped = cssClassDropped;
    this.cssClassInventory = cssClassInventory;
    this.inInventory = inInventory;
    this.htmlElement;
  }

  instantiateHtmlElement(position) {
    const itemElement = createElementWithClass(
      "div",
      `${this.cssClassDropped} dropped-item`
    );
    itemElement.innerHTML = this.symbol;
    const randomPosition = randomPositionInArea(
      position,
      this.game.itemManager.dropRadius
    );

    setCssPosition(itemElement, randomPosition.x, randomPosition.y);
    this.canvas.appendChild(itemElement);
    this.htmlElement = itemElement;
  }

  collect() {
    this.inInventory = true;
    this.deleteHtmlElement();
  }

  drop() {
    this.inInventory = false;
    this.instantiateHtmlElement();
  }

  deleteHtmlElement() {
    this.htmlElement.remove();
    console.log(this.htmlElement.innerHTML + " deleted");
    this.htmlElement = null;
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

  use() {
    // increase score
  }
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
