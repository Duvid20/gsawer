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
    const items = this.game.itemManager.getInventoryItems();
    for (const item of items) {
      if (item.inInventory) {
        const itemElement = document.createElement("div");
        itemElement.className = "inventory-item " + item.className;
        itemElement.innerText = `${item.symbol} x${item.count}`;
        this.inventoryElement.appendChild(itemElement);
      }
    }
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
