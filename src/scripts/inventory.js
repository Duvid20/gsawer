import { createElementWithClass } from "./functions";

class Inventory {
  constructor() {
    this.inventoryOpened = false;
    this.inventory_HTML = createHtml();
  }

  show() {
    build();
    console.log("Inventory opened");
  }

  hide() {
    console.log("Inventory closed");
  }

  build() {
    if (this.inventoryOpened) {
      elementDisplayNone(this.inventory_HTML);
    } else {
      elementDisplayFlex(this.inventory_HTML);
    }

    this.inventoryOpened = !this.inventoryOpened;
  }

  createHtml() {
    const inventory = createElementWithClass("div", "", "inventory", "");
    // .item-inventory class style
    document.getElementById("game-container").appendChild(inventory);
    return inventory;
  }
}

export { Inventory };
