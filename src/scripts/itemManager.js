import { createElementWithClass, setCssPosition } from "./functions.js";
import { Coin, EnergyDrink } from "./items/item.js";

class ItemManager {
  constructor() {
    this.items = { dropped: [], inventory: [] };
  }
  // public methods

  collectCoin(amount) {
    this.addToInventory(new Coin(), amount);
    console.log("Coin collected");
  }

  dropCoin(position, fromInventory) {
    this.dropItem(new Coin(), position, fromInventory);
    console.log("Coin dropped");
  }

  collectEnergyDrink(amount) {
    this.addToInventory(new EnergyDrink(), amount);
    console.log("Energy Drink collected");
  }

  dropEnergyDrink(position, fromInventory) {
    this.dropItem(new EnergyDrink(), position, fromInventory);
    console.log("Energy Drink dropped");
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
    setCssPosition(itemElement, position.x, position.y);
  }

  dropItem(item, position, fromInventory) {
    if (fromInventory) {
      this.removeFromInventory(item, 1);
    }
    this.addToDropped(item);
    this.instantiateItem(item, position);
  }
}

export { ItemManager };
