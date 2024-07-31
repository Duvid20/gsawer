import {
  createElementWithClass,
  setCssPosition,
  randomPositionInArea,
} from "./functions.js";

class Item {
  constructor(
    game,
    name,
    label,
    symbol,
    cssClassDropped,
    cssClassInventory,
    inInventory
  ) {
    this.game = game;
    this.name = name;
    this.label = label;
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
    document.getElementById("game-container").appendChild(itemElement);
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
    super(
      game,
      "coin",
      "Coin",
      "©",
      "coin-dropped",
      "coin-inventory",
      inInventory
    );
  }

  use() {
    // increase score
  }
}

class EnergyDrink extends Item {
  constructor(game, inInventory) {
    super(
      game,
      "energyDrink",
      "Energy Drink",
      "▯",
      "energy-drink-dropped",
      "energy-drink-inventory",
      inInventory
    );
  }

  use() {
    console.log("Energy Drink used");
    // shoot faster for certain amount of time
  }
}

export { Coin, EnergyDrink };
