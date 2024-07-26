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
      },
      energyDrink: {
        name: "energyDrink",
        label: "Energy Drink",
        symbol: this.symbols.energyDrink,
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

  dropItem(item, fromInventory) {
    this.items.dropped.push(item);
  }

  collectItem(item, toInventory) {
    this.items.inventory.push(item);
  }
}

export { ItemManager };
