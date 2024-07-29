import {
  createElementWithClass,
  elementDisplayFlex,
  elementDisplayNone,
} from "./functions.js";

class Inventory {
  constructor() {
    this.inventoryOpened = false;
    this.inventory_HTML = this.createHtml();
  }

  toggle(game) {
    this.inventoryOpened ? this.hide(game) : this.show(game);
    this.inventoryOpened = !this.inventoryOpened;
  }

  show(game) {
    game.pause();
    this.build(game);
    elementDisplayFlex(this.inventory_HTML);
    console.log("Inventory opened");
  }

  hide(game) {
    game.unpause();
    elementDisplayNone(this.inventory_HTML);
    console.log("Inventory closed");
  }

  build(game) {
    this.inventory_HTML.innerHTML = "";
    const itemCounts = this.countItems(game.itemManager.items.inventory);
    this.createItemElements(game, itemCounts);
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

  createItemElements(game, itemCounts) {
    for (const [itemName, count] of Object.entries(itemCounts)) {
      const item = this.findItemByName(
        game.itemManager.items.inventory,
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

    itemElement.appendChild(countElement, itemNameElement);
    return itemElement;
  }

  findItemByName(inventoryItems, itemName) {
    return inventoryItems.find((i) => i.name === itemName);
  }

  createHtml() {
    const inventory = createElementWithClass("div", "", "inventory", "");
    document.getElementById("game-container").appendChild(inventory);
    return inventory;
  }
}

export { Inventory };
