import { KEYBOARD_KEYS } from './constants';
import RoadFighters from './road-fighters';
import Scene from './scene';
import Snake from './snake';

export default class Menu extends Scene {
  constructor(sk) {
    super(sk);
    this.sk = sk;
    this.selectedGame = null;
    this.focusedGame = 0;
    this.games = [
      new RoadFighters(sk),
      new Snake(sk),
    ];
  }

  draw() {
    this.sk.background('#a7a994');
    this.drawGameCanvas();
    if (this.selectedGame === null) {
      this.drawMenu();
    } else {
      this.games[this.selectedGame].draw();
    }
  }

  drawMenu() {
    this.gameSplash(this.games[this.focusedGame]);
  }

  splash() {

  }

  gameSplash(game) {
    this.sk.fill('#676f58');
    this.sk.stroke('#1e1f0f');
    this.sk.strokeWeight(5);
    this.sk.text(
      `${game.name}`,
      this.gameCanvasOffset.x + this.gameCanvasSize.w * this.brickSize.w + 10,
      this.gameCanvasOffset.y + 12
    );
  }

  handleMenuKeyPress(keyCode) {
    console.log(keyCode);
    if (keyCode === this.sk.LEFT_ARROW) {
      this.focusedGame -= 1;
  
      if (this.focusedGame < 0) {
        this.focusedGame = this.games.length - 1;
      }
    }
  
    if (keyCode === this.sk.RIGHT_ARROW) {
      this.focusedGame += 1;
  
      if (this.focusedGame >= this.games.length) {
        this.focusedGame = 0;
      }
    }

    if (keyCode === KEYBOARD_KEYS.ENTER) {
      this.selectedGame = this.focusedGame;
      this.games[this.selectedGame].init();
    }
  }

  handleKeyPress(keyCode) {
    if (keyCode === KEYBOARD_KEYS.ESCAPE) {
      this.selectedGame = null;
    }
    if (this.selectedGame === null) {
      this.handleMenuKeyPress(keyCode);
    } else {
      this.games[this.selectedGame].handleKeyPress(keyCode);
    }
  }
}