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
    this.sk.background('#a7a994');
    this.drawGameCanvas();

    if (this.menu.selectedGame === null) {
      this.menu.draw();
    } else {
      this.menu.games[this.menu.selectedGame].draw();
    }
  }

  keyPress(keyCode) {
    this.menu.handleKeyPress(keyCode);
  }

  keyReleased(keyCode) {
    this.menu.handleKeyReleased(keyCode);
  }
}