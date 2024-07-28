import { createElementWithClass } from "../functions.js";

class Item {
  constructor(name, label, symbol, cssClassDropped, cssClassInventory) {
    this.name = name;
    this.label = label;
    this.symbol = symbol;
    this.cssClassDropped = cssClassDropped;
    this.cssClassInventory = cssClassInventory;
  }

  use() {
    console.log(`${this.label} used`);
  }

  drop(game, position, fromInventory) {
    if (fromInventory) {
      game.itemManager.removeFromInventory(this, 1);
    }
    game.itemManager.addToDropped(this);
    this.instantiate(position);
  }

  collect(game) {
    game.itemManager.addToCollected(this);
  }

  instantiate(position) {
    const itemElement = createElementWithClass(
      "div",
      `${this.cssClassDropped} droppedItem`
    );
    itemElement.innerHTML = this.symbol;
    document.getElementById("game-container").appendChild(itemElement);
    setCssPosition(itemElement, position.x, position.y);
  }
}

class Coin extends Item {
  constructor() {
    super("coin", "Coin", "©", "coinDropped", "coinInventory");
  }
}

class EnergyDrink extends Item {
  constructor() {
    super(
      "energyDrink",
      "Energy Drink",
      "↯▯",
      "energyDrinkDropped",
      "energyDrinkInventory"
    );
  }
}

export { Coin, EnergyDrink };
