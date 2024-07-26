import { PlayerWeapon } from "./playerWeapon.js";
import { HealthBar } from "./healthBar.js";
import {
  getCenterOfScreen,
  setCssPosition,
  createElementWithClass,
} from "./functions.js";

class Player {
  constructor(game) {
    this.position = getCenterOfScreen();
    this.speed = 5;
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
    this.htmlElement = this.createHtmlElement(game);
    this.weapon = new PlayerWeapon(game, 30);
    this.healthBar = new HealthBar(
      this.maxHealth,
      this.health,
      this.htmlElement,
      "green",
      50,
      true
    );

    // player movement
    this.initEventListeners();
    this.updatePosition(game);
  }

  updatePosition(game) {
    if (!game.gamePaused && game.gameRunning) {
      this.calculatePosition(game);
      setCssPosition(this.htmlElement, this.position.x, this.position.y);

      requestAnimationFrame(() => this.updatePosition(game));

      //update weapon position
      this.weapon.updatePosition(game);
    }
  }

  initEventListeners() {
    document.addEventListener("keydown", (event) => {
      this.handleKey(event, true);
    });
    document.addEventListener("keyup", (event) => {
      this.handleKey(event, false);
    });
  }

  calculatePosition(game) {
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
    velocity = this.normalizeVelocity(velocity);

    this.position.x += velocity.x;
    this.position.y += velocity.y;

    // ensure player stays within game container bounds
    this.position.x = Math.max(
      0,
      Math.min(
        this.position.x,
        game.gameContainer_HTML.clientWidth - this.htmlElement.clientWidth
      )
    );
    this.position.y = Math.max(
      0,
      Math.min(
        this.position.y,
        game.gameContainer_HTML.clientHeight - this.htmlElement.clientHeight
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

  createHtmlElement(game) {
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

    game.gameContainer_HTML.appendChild(player);

    return player;
  }

  normalizeVelocity(velocity) {
    if (velocity.x !== 0 && velocity.y !== 0) {
      const length = Math.sqrt(
        velocity.x * velocity.x + velocity.y * velocity.y
      );
      velocity.x = (velocity.x / length) * this.speed;
      velocity.y = (velocity.y / length) * this.speed;
    }
    return velocity;
  }
}

export { Player };
