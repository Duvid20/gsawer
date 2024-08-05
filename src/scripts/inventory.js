import { createHtmlElement } from "./functions.js";

class Inventory {
  constructor(game) {
    this.game = game;
    this.isOpen = false;
    this.inventoryElement = document.getElementById("inventory");
    this.inventoryBodyElement = document.getElementById("inventory-body");
  }

  useItem(itemName, player) {
    if (this.items[itemName] && this.items[itemName].count > 0) {
      this.items[itemName].item.use(player);
      this.items[itemName].count--;
      this.updateInventoryDisplay();
    }
  }

  updateInventoryDisplay() {
    this.inventoryBodyElement.innerHTML = "";
    const itemCount = this.game.itemManager.count(
      this.game.itemManager.getInventoryItems()
    );

    itemCount.forEach((count, itemName) => {
      const item = this.game.itemManager.findItemByName(
        this.game.itemManager.getInventoryItems(),
        itemName
      );
      const element = this.createInventoryElement(item, count);
      this.inventoryBodyElement.appendChild(element);
    });
  }

  createInventoryElement(item, count) {
    const classes = "inventory-item " + item.className;
    const element = createHtmlElement(
      "div",
      classes,
      "",
      item.symbol + " x" + count
    );
    return element;
  }

  open() {
    this.inventoryElement.style.display = "flex";
    this.isOpen = true;
    this.updateInventoryDisplay();
  }

  close() {
    this.inventoryElement.style.display = "none";
    this.isOpen = false;
  }
}

export { Inventory };
