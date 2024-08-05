import { Item } from "./item.js";

class ItemManager {
  constructor(game) {
    this.game = game;
    this.items = [];
    this.dropRadius = 13;
  }

  createItems(itemType, position, amount, inInventory) {
    for (let i = 0; i < amount; i++) {
      const item = new itemType(this.game, inInventory);
      if (!item.inInventory) {
        // create Item Canvas element
        item.drop(position);
      }
      this.items.push(item);
    }
  }

  count(items) {
    const itemCount = new Map();
    for (const item of items) {
      itemCount.set(item.name, (itemCount.get(item.name) || 0) + 1);
    }
    return itemCount;
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

export { ItemManager };
