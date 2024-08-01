class Inventory {
  constructor() {
    this.items = {};
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
    for (const itemName in this.items) {
      const item = this.items[itemName];
      const itemElement = document.createElement("div");
      itemElement.className = "inventory-item";
      itemElement.innerText = `${item.item.symbol} x${item.count}`;
      this.inventoryElement.appendChild(itemElement);
    }
  }

  toggle() {
    if (this.inventoryBodyElement.style.display === "none") {
      this.inventoryBodyElement.style.display = "flex";
    } else {
      this.inventoryBodyElement.style.display = "none";
    }
  }
}

export { Inventory };
