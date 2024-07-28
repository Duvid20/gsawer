class ItemManager {
  constructor() {
    this.items = { dropped: [], inventory: [] };
  }

  addTo(item, amount, where) {
    for (let i = 0; i < amount; i++) {
      where.push(item);
    }
  }

  addToDropped(item, amount) {
    addTo(item, amount, this.items.dropped);
  }

  addToInventory(item) {
    addTo(item, amount, this.items.inventory);
  }

  removeFrom(item, amount, where) {
    let count = 0;
    where = where.filter((i) => {
      if (i === item && count < amount) {
        count++;
        return false;
      }
      return true;
    });
  }

  removeFromInventory(item, amount) {
    removeFrom(item, amount, this.items.inventory);
  }

  removeFromDropped(item, amount) {
    removeFrom(item, amount, this.items.dropped);
  }
}

export { ItemManager };
