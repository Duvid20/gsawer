import { PlayerWeapon } from "./playerWeapon.js";

class Player {
  constructor(game) {
    this.position = { x: 100, y: 100 };
    this.speed = 5;
    this.appearence = "(._.)";
    this.health = 15;
    this.movement = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
    this.htmlElement = this.createHtmlElement(game);
    this.weapon = new PlayerWeapon(game, 25);

    // player movement
    document.addEventListener("keydown", (event) =>
      this.handleKey(event, true)
    );
    document.addEventListener("keyup", (event) => this.handleKey(event, false));

    this.updatePosition(game);
  }

  updatePosition(game) {
    this.calculatePosition(game);
    game.setCssPosition(this.htmlElement, this.position.x, this.position.y);

    requestAnimationFrame(() => this.updatePosition(game));

    //update weapon position
    this.weapon.updatePosition(game);
  }

  calculatePosition(game) {
    if (this.movement.up && this.position.y > 0) {
      this.position.y -= this.speed;
    }
    if (
      this.movement.down &&
      this.position.y <
        game.gameContainer_HTML.clientHeight - this.htmlElement.clientHeight
    ) {
      this.position.y += this.speed;
    }
    if (this.movement.left && this.position.x > 0) {
      this.position.x -= this.speed;
    }
    if (
      this.movement.right &&
      this.position.x <
        game.gameContainer_HTML.clientWidth - this.htmlElement.clientWidth
    ) {
      this.position.x += this.speed;
    }
  }

  handleKey(event, isKeyDown) {
    const keyMap = {
      w: "up",
      W: "up",
      ArrowUp: "up",
      a: "left",
      A: "left",
      ArrowLeft: "left",
      s: "down",
      S: "down",
      ArrowDown: "down",
      d: "right",
      D: "right",
      ArrowRight: "right",
    };
    const direction = keyMap[event.key];
    if (direction) {
      this.movement[direction] = isKeyDown;
    }
  }

  createHtmlElement(game) {
    const player = game.createElementWithClass("div", "noselect", "player");
    const playerInfos = game.createElementWithClass("div", "", "player-infos");
    const bulletCount = game.createElementWithClass("div", "bullet-count");
    const playerHealth = game.createElementWithClass("div", "player-health");

    playerInfos.appendChild(bulletCount);
    playerInfos.appendChild(playerHealth);

    const playerAppearance = game.createElementWithClass(
      "div",
      "",
      "player-appearance",
      this.appearence
    );

    player.appendChild(playerInfos);
    player.appendChild(playerAppearance);

    document.getElementById("game-container").appendChild(player);

    return player;
  }
}

export { Player };
