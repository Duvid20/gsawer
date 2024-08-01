/*class ItemManager {
  constructor(game) {
    this.game = game;
    this.items = [];
    this.dropRadius = 13;
  }

  createItems(itemType, position, amount, inInventory) {
    for (let i = 0; i < amount; i++) {
      const item = new itemType(this.game, inInventory);
      if (!item.inInventory) {
        item.instantiateHtmlElement(position);
      }
      this.items.push(item);
    }
  }

  getDroppedItems() {
    return this.items.filter((item) => !item.inInventory);
  }

  getInventoryItems() {
    return this.items.filter((item) => item.inInventory);
  }

  findItemByName(items, itemName) {
    return items.find((i) => i.name === itemName);
  }
}

export { ItemManager };*/