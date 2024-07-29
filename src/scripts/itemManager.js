import {
  createElementWithClass,
  setCssPosition,
  getRandomInt,
} from "./functions.js";
import { Coin, EnergyDrink } from "./items/item.js";

class ItemManager {
  constructor() {
    this.items = { dropped: [], inventory: [] };
    this.dropRadius = 13;
  }

  // public methods
  collectDroppedItem(item) {
    this.removeFromDropped(item, 1);
    this.addToInventory(item, 1);
    console.log(`${item.constructor.name} collected`);
  }

  collectCoin(amount) {
    this.addToInventory(new Coin(), amount);
    console.log(`${amount} Coin(s) collected`);
  }

  dropCoins(position, fromInventory, amount) {
    this.dropItems(new Coin(), position, fromInventory, amount);
    console.log(`${amount} Coin(s) dropped`);
  }

  collectEnergyDrink(amount) {
    this.addToInventory(new EnergyDrink(), amount);
    console.log(`${amount} Energy Drink(s) collected`);
  }

  dropEnergyDrinks(position, fromInventory, amount) {
    this.dropItems(new EnergyDrink(), position, fromInventory, amount);
    console.log(`${amount} Energy Drink(s) dropped`);
  }

  // private methods
  addTo(item, amount, where) {
    for (let i = 0; i < amount; i++) {
      where.push(item);
    }
  }

  addToDropped(item, amount = 1) {
    this.addTo(item, amount, this.items.dropped);
  }

  addToInventory(item, amount = 1) {
    this.addTo(item, amount, this.items.inventory);
  }

  removeFrom(item, amount, where) {
    let count = 0;
    this.items[where] = this.items[where].filter((i) => {
      if (i === item && count < amount) {
        count++;
        return false;
      }
      return true;
    });
  }

  removeFromInventory(item, amount) {
    this.removeFrom(item, amount, "inventory");
  }

  removeFromDropped(item, amount) {
    this.removeFrom(item, amount, "dropped");
  }

  instantiateItem(item, position) {
    const itemElement = createElementWithClass(
      "div",
      `${item.cssClassDropped} droppedItem`
    );
    itemElement.innerHTML = item.symbol;
    document.getElementById("game-container").appendChild(itemElement);

    const randomPosition = this.randomDropPosition(position);

    setCssPosition(itemElement, randomPosition.x, randomPosition.y);
  }

  dropItems(item, position, fromInventory, amount) {
    if (fromInventory) {
      this.removeFromInventory(item, amount);
    }

    for (let i = 0; i < amount; i++) {
      this.addToDropped(item);
      this.instantiateItem(item, position);
    }
  }

  randomDropPosition(position) {
    const random = {
      x: position.x + getRandomInt(-this.dropRadius, this.dropRadius),
      y: position.y + getRandomInt(-this.dropRadius, this.dropRadius),
    };

    return random;
  }
}

export { ItemManager };
