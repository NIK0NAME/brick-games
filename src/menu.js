import RoadFighters from './road-fighters';
import Snake from './snake';

export default class Menu {
  constructor(sk) {
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
    if (this.selectedGame === null) {
      this.drawMenu();
    } else {
      this.games[this.selectedGame].draw();
    }
  }

  drawMenu() {
    this.games[this.focusedGame].splash();
  }

  splash() {

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

    if (keyCode === 13) {
      this.selectedGame = this.focusedGame;
      this.games[this.selectedGame].init();
    }
  }

  handleKeyPress(keyCode) {
    if (keyCode === 27) {
      this.selectedGame = null;
    }
    if (this.selectedGame === null) {
      this.handleMenuKeyPress(keyCode);
    } else {
      this.games[this.selectedGame].handleKeyPress(keyCode);
    }
  }
}