

/*import {
  createElementWithClass,
  elementDisplayFlex,
  elementDisplayNone,
} from "./functions.js";

class Inventory {
  constructor(game) {
    this.game = game;
    this.inventoryOpened = false;
    this.inventory_HTML = this.createHtml();
  }

  toggle() {
    this.inventoryOpened ? this.hide() : this.show();
    this.inventoryOpened = !this.inventoryOpened;
  }

  show() {
    this.game.pause();
    this.build();
    elementDisplayFlex(this.inventory_HTML);
    console.log("Inventory opened");
  }

  hide() {
    this.game.unpause();
    elementDisplayNone(this.inventory_HTML);
    console.log("Inventory closed");
  }

  build() {
    this.inventory_HTML.innerHTML = "";
    const itemCounts = this.countItems(
      this.game.itemManager.getInventoryItems()
    );
    this.createItemElements(itemCounts);
    console.log("Inventory built");
  }

  countItems(items) {
    const itemCounts = {};
    items.forEach((item) => {
      if (itemCounts[item.name]) {
        itemCounts[item.name]++;
      } else {
        itemCounts[item.name] = 1;
      }
    });
    return itemCounts;
  }

  createItemElements(itemCounts) {
    for (const [itemName, count] of Object.entries(itemCounts)) {
      const inventoryItems = this.game.itemManager.getInventoryItems();
      const item = this.game.itemManager.findItemByName(
        inventoryItems,
        itemName
      );
      const itemElement = this.createItemHtml(item, count);
      this.inventory_HTML.appendChild(itemElement);
    }
  }

  createItemHtml(item, count) {
    const itemElement = createElementWithClass(
      "div",
      "inventory-item",
      "",
      item.symbol
    );

    const itemNameElement = createElementWithClass(
      "span",
      "inventory-item-name",
      "",
      item.label
    );

    const countElement = createElementWithClass(
      "span",
      "item-count",
      "",
      count
    );

    const inventoryFooterElement = createElementWithClass(
      "div",
      "press-key-info",
      "inventory-footer",
      "Press >e to close"
    );

    itemElement.appendChild(countElement, itemNameElement, inventoryFooterElement);
    return itemElement;
  }

  createHtml() {
    const inventory = createElementWithClass("div", "", "inventory", "");
    document.getElementById("game-container").appendChild(inventory);
    return inventory;
  }
}

export { Inventory };*/
