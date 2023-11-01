import p5 from 'p5';
import Menu from './menu';

export default class GameController {
  constructor(sk) {
    this.sk = sk;
    this.state = 'MENU';
    this.menu = new Menu(this.sk);
  }

  draw() {
    this.menu.draw();
  }

  handleKeyPress(keyCode) {
    this.menu.handleMenuKeyPress(keyCode);
  }

  handleKeyReleased(keyCode) {
    this.menu.handleMenuKeyReleased(keyCode);
  }
}