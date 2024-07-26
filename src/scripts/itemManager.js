import { createElementWithClass, setCssPosition } from "./functions.js";

class ItemManager {
  constructor() {
    this.items = { dropped: [], inventory: [] };
    this.symbols = {
      coin: "©",
      energyDrink: "↯▯",
    };

    this.itemList = {
      coin: {
        name: "coin",
        label: "Coin",
        symbol: this.symbols.coin,
        cssClassDropped: "coinDropped",
        cssClassInventory: "coinInventory",
      },
      energyDrink: {
        name: "energyDrink",
        label: "Energy Drink",
        symbol: this.symbols.energyDrink,
        cssClassDropped: "energyDrinkDropped",
        cssClassInventory: "energyDrinkInventory",
      },
    };
  }

  useItem(item) {
    switch (item.name) {
      case "coin":
        console.log(coin.label + " used");
        break;
      case "energyDrink":
        console.log(energyDrink.label + " used");
        break;
      default:
        console.log("Item not recognized");
    }
  }

  dropItem(item, position, fromInventory) {
    if (fromInventory) {
      // remove item from inventory list
      removeFromInventory(item);
    }

    // add item to dropped list
    this.items.dropped.push(item);
  }

  instantiateItem(item, position) {
    const itemElement = createElementWithClass("div", item.cssClassDropped);
    itemElement.innerHTML = item.symbol;

    document.getElementById("game-container").appendChild(itemElement);
    setCssPosition(itemElement, position.x, position.y);
  }

  removeFromInventory(item) {
    this.items.inventory = this.items.inventory.filter((i) => i !== item);
  }

  collectItem(item, toInventory) {
    this.items.inventory.push(item);
  }
}

export { ItemManager };
