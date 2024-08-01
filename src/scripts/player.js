import { Weapon } from "./playerWeapon.js";

class Player {
  constructor(canvas, x, y) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.weapon = new Weapon(this);
    this.keys = {};
  }

  handleKeyDown(e) {
    this.keys[e.key] = true;
  }

  handleKeyUp(e) {
    this.keys[e.key] = false;
  }

  update() {
    if (this.keys["a"] || this.keys["arrowUp"]) this.x -= this.speed;
    if (this.keys["d"]) this.x += this.speed;
    if (this.keys["w"]) this.y -= this.speed;
    if (this.keys["s"]) this.y += this.speed;
    this.weapon.update();
  }

  draw(context) {
    context.fillStyle = "blue";
    context.fillRect(this.x - 15, this.y - 15, 30, 30);
    this.weapon.draw(context);
  }
}

export { Player };

/*import { PlayerWeapon } from "./playerWeapon.js";
import { HealthBar } from "./healthBar.js";
import { MovingRoundArea } from "./movingRoundArea.js";
import {
  getCenterOfScreen,
  setCssPosition,
  createElementWithClass,
  getCenterCoordinates,
  getCenterCoordinatesBySelector,
  calcDistance,
  normalizeVelocity,
} from "./functions.js";

class Player {
  constructor(game) {
    this.game = game;
    this.projectiles = [];
    this.position = getCenterOfScreen();
    this.speed = 5;
    this.collectionRadius = 50;
    this.appearence = {
      normal: "(._.)",
      happy: "(^o^)",
      collect: "($_$)",
      damage: "(X_X)",
    };
    this.maxHealth = 100;
    this.health = this.maxHealth;
    this.movement = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
    this.htmlElement = this.createHtmlElement();
    this.weapon = new PlayerWeapon(game, 30);
    this.healthBar = new HealthBar(
      this.maxHealth,
      this.health,
      this.htmlElement,
      "green",
      this.collectionRadius,
      true
    );
    this.collectionRadiusArea = new MovingRoundArea(
      "#player",
      this.collectionRadius,
      "player-collection-radius"
    );

    // player movement
    this.initEventListeners();
    this.updatePosition();
  }

  updatePosition() {
    if (!this.game.gamePaused && this.game.gameRunning) {
      this.calculatePosition();
      setCssPosition(this.htmlElement, this.position.x, this.position.y);
      this.collectItemsWithinRadius();
      requestAnimationFrame(() => this.updatePosition());
      this.weapon.updatePosition();
      this.collectionRadiusArea.update();
    }
  }

  takeDamage(amount) {
    this.health -= amount;
    this.healthBar.decrease(amount);
    this.htmlElement.querySelector("#player-appearance").innerHTML =
      this.appearence.damage;
    if (this.health <= 0) {
      this.die();
    }
  }

  die() {
    this.game.end();
  }

  initEventListeners() {
    document.addEventListener("keydown", (event) => {
      this.handleKey(event, true);
    });
    document.addEventListener("keyup", (event) => {
      this.handleKey(event, false);
    });
  }

  calculatePosition() {
    let velocity = { x: 0, y: 0 };

    if (this.movement.up) {
      velocity.y -= this.speed;
    }
    if (this.movement.down) {
      velocity.y += this.speed;
    }
    if (this.movement.left) {
      velocity.x -= this.speed;
    }
    if (this.movement.right) {
      velocity.x += this.speed;
    }

    // normalize  velocity vector if moving diagonally
    velocity = normalizeVelocity(velocity, this.speed);

    this.position.x += velocity.x;
    this.position.y += velocity.y;

    // ensure player stays within game container bounds
    this.position.x = Math.max(
      0,
      Math.min(
        this.position.x,
        this.game.gameContainer_HTML.clientWidth - this.htmlElement.clientWidth
      )
    );
    this.position.y = Math.max(
      0,
      Math.min(
        this.position.y,
        this.game.gameContainer_HTML.clientHeight -
          this.htmlElement.clientHeight
      )
    );
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

  createHtmlElement() {
    const player = createElementWithClass("div", "noselect", "player");
    const playerInfos = createElementWithClass("div", "", "player-infos");
    const bulletCount = createElementWithClass("div", "bullet-count");
    const playerHealth = createElementWithClass("div", "player-health");

    playerInfos.appendChild(bulletCount);
    playerInfos.appendChild(playerHealth);

    const playerAppearance = createElementWithClass(
      "div",
      "",
      "player-appearance",
      this.appearence.normal
    );

    player.appendChild(playerInfos);
    player.appendChild(playerAppearance);

    this.game.gameContainer_HTML.appendChild(player);

    return player;
  }

  collectItemsWithinRadius() {
    const items = this.game.itemManager.getDroppedItems();
    const playerCenter = getCenterCoordinatesBySelector("#player");

    items.forEach((item) => {
      const itemCenter = getCenterCoordinates(item.htmlElement);
      const { distance } = calcDistance(itemCenter, playerCenter);

      if (distance <= this.collectionRadius + 5) {
        item.collect();
      }
    });
  }
}

export { Player };*/
