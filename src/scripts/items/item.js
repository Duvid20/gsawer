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
}

class Coin extends Item {
  constructor() {
    super("coin", "Coin", "©", "coin-dopped", "coin-inventory");
  }
}

class EnergyDrink extends Item {
  constructor() {
    super(
      "energyDrink",
      "Energy Drink",
      "▯",
      "energy-drink-dropped",
      "energy-drink-inventory"
    );
  }
}

export { Coin, EnergyDrink };
