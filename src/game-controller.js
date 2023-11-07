import { KEYBOARD_KEYS } from './constants';
import Menu from './menu';
import Scene from './scene';

export default class GameController extends Scene {
  constructor(sk) {
    super(sk, { id: 'game-controller' });
    this.sk = sk;
    this.state = 'MENU';
    this.menu = new Menu(this.sk);
  }

  draw() {
    this.sk.background('#838d72');
    this.drawGameCanvas();

    if (this.menu.selectedGame === null) {
      this.menu.draw();
    } else {
      this.menu.games[this.menu.selectedGame].draw();
    }
  }

  keyPress(keyCode) {
    if (keyCode === KEYBOARD_KEYS.ESCAPE) {
      this.menu.selectedGame = null;
    }

    if (this.menu.selectedGame === null) {
      this.menu.handleKeyPress(keyCode);
    } else {
      this.menu.games[this.menu.selectedGame].handleKeyPress(keyCode);
    }
  }

  keyReleased(keyCode) {
    if (this.menu.selectedGame === null) {
      this.menu.handleKeyReleased(keyCode);
    } else {
      this.menu.games[this.menu.selectedGame].handleKeyReleased(keyCode);
    }
  }
}