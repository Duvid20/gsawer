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
        value: 0,
      },
      energyDrink: {
        name: "energyDrink",
        label: "Energy Drink",
        symbol: this.symbols.energyDrink,
        value: 1,
      },
    };
  }

  useItem(item) {
    switch (item.name) {
      case "coin":
        console.log("Coin used");
        break;
      case "energyDrink":
        console.log("Energy Drink used");
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
